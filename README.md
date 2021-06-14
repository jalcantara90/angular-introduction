# Angular Introduction

## Installation

```bash
 npm install

 npm start
```

## Challenges

In this project are used some bad practices, in the next challenges we are going to improve it.

#### Challenge #1 Initial load

We have a configuration service that simulates an http service that is calling our Backend For Frontend to get the ApiUrl and some apiKeys.
We need to call this service before call any other service, because we need to know the apiUrl if we see every place we are calling our PokemonService we do something like that

```typescript
  this.configurationService.loadConfiguration().subscribe(() =>
    this.pokemonService.getPokemonList()
      .subscribe((response) => this.pokemonList = response)
  );
```

Then we are going to do the loadConfiguration while the app is initializing to ensure we have this info loaded and remove all place we are calling loadConfiguration explicitly


> To do this we need to use [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER)

1. We need to add in our AppModule the Configuration Service as provider inside the providers array
 ```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    ...
    ConfigurationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 ```
2. We need to add a new provider and provide the APP_INITIALIZER and the Configuration config as deps, then we assign a function in factory field.
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [

    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigurationService],
      useFactory: initilizeApp
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Define the initializeApp factory, it will be a function that receive the deps by params and return a function that has a promise as return (In the next angular versions 12> this factory can return an observable).
```typescript
function initilizeApp(configService: ConfigurationService) {
  return () => configService.loadConfiguration().toPromise();
}
```
4. Remove the calls and imports of ConfigurationService from app-initializer.component.ts, child.component.ts, pokemon-detail.component.ts

> Solution in branch: app-initialize

#### Challenge #2 Comunication Patterns
We have a lot of forms to make comunication between children and parents components, but in this challenge we are going to focus in [Smart & Dumb components](https://jalcantara90.medium.com/container-and-presentational-pattern-en-angular-5e67a0fca05d)

If we go to the child.component.ts we see that this component is calling our service to get the pokemon that are writed inside the input, and returning into parent component, this is not his responsability, because it makes that we can't reuse this component as search component and it mus tbe our main objective, create a bunch of reusable components to compon our views, then we are going to remove this logic from child and use it on parent.

1. Remove the service injection and call from child.component.
```typescript
export class ChildComponent  {
  searchPokemonControl = new FormControl();

  @Output() searchPokemon = this.searchPokemonControl.valueChanges.pipe(
    debounceTime(400)
  );
}
```

2. Create function in parent components that handle the child output.
```typescript
export class ParentComponent {
  selected: Pokemon = null;
  constructor(private pokemonService: PokemonService) { }

  search(query: string) {
    this.pokemonService.searchPokemon(query).subscribe(pokemon => this.selected = pokemon);
  }
}
```
3. Add the search function into output of child component in parent.component.html
```html
<app-child
  (searchPokemon)="search($event)">
</app-child>
```

> Solution in branch: comunication-pattern


> Angular has build on top of RxJs and the framework is using to do a lot of things like routing and httpCalls, in the nexts challenges we are going to see some good practices managing rxjs observables

#### Challenge #3 Handle subscriptions
When we subscribe into an observable we need to unsubscribe from it when we don't need anymore else we can get memory leaks and it will affect to our performance (Angular take care about observable of routing and http calls for us, but todidactic purposes, we are going to unsubscribre from it to learn how to make it).

> pokemon-detail.component.ts

1. Create a subscripion property for each observable we need to unsubscribe

```typescript
export class PokemonDetailComponent implements OnInit {
  ...

  private routeSubscription = new Subscription();
  private pokemonSubscription = new Subscription();
  private spiceSubscription = new Subscription();
  ...
```

2. Assign this properties to every subscribe

```typescript
export class PokemonDetailComponent implements OnInit {
  ...
  this.routeSubscription = this.activatedRoute.params.subscribe(({pokemonId}) => {
    this.pokemonSubscription = this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.spiceSubscription = this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description);
    });
  });
...

```

3. Add the implementation of OnDestroy in class and use the ngOnDestroy hook to destroy the subscriptions.

```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {
  ...

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.pokemonSubscription.unsubscribe();
    this.spiceSubscription.unsubscribe();
  }
```
> Solution in branch: handle-subscriptions

#### Challenge #4 Handle with single subscription
In the last challenge we are unsubscribe from all Observables, but we are assign the result of subscribe ( subscription ) into our subscription property, but here we have an issue, that Observable can emit several events and if we subscribe inside of other observable into a new one and we assign the result into a property, every time the parent observable are executing we override the last assigned subscription that make that some old observable will not unsubscribed (In the case of routing Observable, only emits new events when the route changes, and the httpClient emits once and completes but like the last challenge we are treating as common observables)

To Improve this errors, we can add subscription instead of assign a subscription, let's see.

1. Define only one subscription
```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

```

2. Add the route subscription into our subscription.
```typescript
this.subscription.add(
  this.activatedRoute.params.subscribe(({pokemonId}) => {
    this.pokemonSubscription = this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.spiceSubscription = this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description);
    });
  })
)
```

3. Add the pokemon subscription into our subscription.
```typescript
this.subscription.add(
  this.activatedRoute.params.subscribe(({pokemonId}) => {
    this.subscription.add(
      this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.spiceSubscription = this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description);
      })
    )
  })
)
```

4. Add the spice subscription into our subscription.
```typescript
this.subscription.add(
  this.activatedRoute.params.subscribe(({pokemonId}) => {
    this.subscription.add(
      this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.subscription(
          this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description)
        )
      })
    )
  })
)
```

5. Only unsubscribe of our single subscription in ngOnDestroy hook.

```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {
  ...
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
```

> solution in branch: handle-subscription-in-one


#### Challenge #5 Handle subscription with subject
With the last approach we are cover an issue that we don't handle in the first way, but is we speak in maintainability terms, this code is weird and hard to maintain,but we can use another pattern to handle subscriptions that consist in listen another observable to complete the other ones.

1. We create a subject instead of subscription property.
```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {
  
  private destroy$$ = new Subject();
```

2. Remove the subscription.add from routeSubscription and add a pipe with the takeUntil operator with the subject.

```typescript
  this.activatedRoute.params.pipe(
    takeUntil(this.destroy$$)
  ).subscribe(({pokemonId}) => {
    this.subscription.add(
      this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.subscription(
          this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description)
        )
      })
    )
  });
```

3. Remove the subscription.add from pokemonSubscription and add a pipe with the takeUntil operator with the subject.

```typescript
  this.activatedRoute.params.pipe(
    takeUntil(this.destroy$$)
  ).subscribe(({pokemonId}) => {
    this.pokemonService.getPokemon(pokemonId).pipe(
      takeUntil(this.destroy$$)
    ).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.subscription(
        this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description)
      )
    });
  });
```

4. Remove the subscription.add from pokemon getSpice subscription and add a pipe with the takeUntil operator with the subject.

```typescript
  this.activatedRoute.params.pipe(
    takeUntil(this.destroy$$)
  ).subscribe(({pokemonId}) => {
    this.pokemonService.getPokemon(pokemonId).pipe(
      takeUntil(this.destroy$$)
    ).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.pokemonService.getSpice(pokemon.species.url).pipe(
        takeUntil(this.destroy$$)
      ).subscribe(description => this.description = description)
    });
  });
```

5. Instead of call subscription.unsubscribe in ngOnDestroy, now only need to call this.destroy$$.next() and this.destroy$$.complete().
```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {
  ...
  ngOnDestroy(): void {
    this.destroy$$.next(); // Emits the event that other Observables are listen to complete them
    this.destroy$$.complete(); // complete destroy$$ to close listener of this observable
  }
```
#### Challenge #6 Use pipeline to group into a single subscription
Now we have a more maintainable code and we still are managing the subscriptions, but how we talk before subscribing inside the other observable is a bad practice, then if we need the result of observable to get the next observable, we can make a pipeline to do that, with this aproach we don't need to subscribe inside the other observable anymore.

1. Add a in the route pipeline a switchMap operator to use the param to call the new observable.

```typescript
  this.activatedRoute.params.pipe(
    switchMap(({pokemonId}) => this.pokemonService.getPokemon(pokemonId)), // switchMap unsubscribe from previous observable and subscribe into the next one
    takeUntil(this.destroy$$)
  ).subscribe((pokemon) => {
    this.pokemon = pokemon;
    this.pokemonService.getSpice(pokemon.species.url).pipe(
      takeUntil(this.destroy$$)
    ).subscribe(description => this.description = description)
  });
```

2. Add another pipe into getPokemon and another switchMap to get the spice

```typescript
  this.activatedRoute.params.pipe(
    switchMap(({pokemonId}) =>{
      return this.pokemonService.getPokemon(pokemonId).pipe(
        switchMap(pokemon => {
          return this.pokemonService.getSpice(pokemon.species.url).pipe(
            map(description => { // We use map to transform the response
              return {
                ...pokemon, // We still are in the get Pokemon context, then we can acces into pokemon properties
                description
              }
            })
          )
        })
      )
    }), // If we make only this we receive in subscribe only the description, how we need the complete pokemon info we use map to return a pokemon object
    takeUntil(this.destroy$$)
  ).subscribe((pokemon) => {
    this.pokemon = pokemon;
  });
```

3. Change the use of description in pokemon-detail.component.ts to pokemon.description because now this property is part of our pokemon.
```html
  <p>{{pokemon.description}}</p>
```

> Solution in branch: use-pipelines-to-handle-single-subscription


#### Challenge #7 Remove subscription and use Async pipe
Now we have a great win using the power of rxjs operatos but we still can make some improvement to delegate to angular the responsibilty of subscribing and unsubscribing from observables that we need to print in the view.

1. Change our pokemon property to pokemon$: Observable<Pokemon>;
> For identify which properties are observables are added at the end of the property de $ symbol.
```typescript
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon$!: Observable<Pokemon>;
  ...
```

2. Remove the subscribe and assign the observable directly into our new property.

```typescript
 ngOnInit(): void {
    this.pokemon$ = this.activatedRoute.params.pipe(
      switchMap(({pokemonId}) => {
        return this.pokemonService.getPokemon(pokemonId).pipe(
          switchMap((pokemon) => {
            return this.pokemonService.getSpice(pokemon.species.url).pipe(
              map(description => {
                return {
                  ...pokemon,
                  description
                }
              })
            )
          })
        )
      })
    );
  }
```
>  we can remove the onDestroy implementation now

3. Now we can use in the template directly (See but no implement)

```html
<!-- pokemon-detail.component.ts -->
  <ng-container *ngIf="pokemon$ | async">

  <h2>{{ '#' + pokemon.id  + ' '}} {{(pokemon$ | async).name}}</h2>

  <div class="sprite-container">
    <article>
      <h3>Normal</h3>
      <div class="sprite-container__group">
        <div class="sprite">
          <img loading="lazy" [src]="(pokemon$ | async).sprites.front_default" alt="">
          <span>Front</span>
        </div>
  ...

```
> This is so weird and it has some issues that in every place we are using pokemon$ | async we are subscribing into it in this piece of code we are subscribing 4 times and every time we are subscribing into it we make 2 http calls (one to get pokemon and another to get the description), instead of this the ngIf allow us to return an alias of property that use async pipe with the as word and creates this property inside the ngIf context

4. We can use the *ngIf as to use pokemon like before.

```html
<!-- pokemon-detail.component.ts -->
  <ng-container *ngIf="pokemon$ | async as pokemon">

  <h2>{{ '#' + pokemon.id  + ' '}} {{pokemon.name}}</h2>

  <div class="sprite-container">
    <article>
      <h3>Normal</h3>
      <div class="sprite-container__group">
        <div class="sprite">
          <img loading="lazy" [src]="pokemon.sprites.front_default" alt="">
          <span>Front</span>
        </div>
  ...

```

5. try to make the same in the app-initializer.component and in the parent.component.ts.

> Solution in branch: handle-subscription-with-async-pipe


#### Challenge #8 Lazy load
If we see our bundle details now we have an main.js file that has 93kb +- of weight, this is not so much but we have a little application but the issue here is that we are getting all modules in the main bundle include the modules that we load only when navigates, this make our initial load slower, we can improve it using lazy load.

1. Remove the imports of ComunicationPatternModule, AppInitializerModule and ManageMultipleStreamsModule inside the app.module.ts
2. Create a routing for every removed module (ComunicationPatternModule, AppInitializerModule and ManageMultipleStreamsModule)
> This is already implemented in this project but see the modules with -routing prefix to se how are defined.
3. Change the routing definition of our app-routing.module.ts to use loadChildren instead of component.
```typescript
const routes: Routes = [
  { path: 'app-initializer', loadChildren: () => import('./app-initializer/app-initializer.module').then(m => m.AppInitializerModule) },
  { path: 'comunication-pattern', loadChildren: () => import('./comunication-pattern/comunication-pattern.module').then(m => m.ComunicationPatternModule) },
  { path: 'multiple-stream', loadChildren: () => import('./manage-multiple-streams/manage-multiple-streams.module').then(m => m.ManageMultipleStreamsModule) }
];
```
> Thats all!! if we see now the bundle our main.js weights 30kb +- and we have a separated file for every module that is loaded when we navigate
> Solution in branch: lazy-load

#### Challenge #9 Preload strategy
If we need we can add a preload strategies to load some modules for some condition, in this case we are create a simple strategy that auto download the all modules if the connection is better than 3g.

1. Create a file called networ-preload.strategy.ts and implements the PreloadingStrategy interface
```typescript
@Injectable({ providedIn: 'root' })
export class NetworkPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    throw new Error('Not implemented');
  }
}
```

2. Create a method that check our connection in the window.navigator

```typescript
@Injectable({ providedIn: 'root' })
export class NetworkPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    throw new Error('Not implemented');
  }

  hasGoodConnection(): boolean {
    const { connection } = navigator as any;

    if (connection) {
      const ignoreConnections = ['slow-2g', '2g', 'slow-3g', '3g'];
      const { effectiveType } = connection;

      if (ignoreConnections.includes(effectiveType)) {
        return false;
      }
    }

    return true;
  }
}
```

3. Use this method in preload method to return the load() when whe whant to download the modules and EMPTY if not.
```typescript
@Injectable({ providedIn: 'root' })
export class NetworkPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection() ? load() : EMPTY;
  }
  ...
}

```

> Solution in branch: preload-strategy

#### BONUS Challenge #10 Inject global dependencies

Usually we use some global dependencies just importing and this can make some issues, for example if we use browser properties or methods in a server side application or in some environment that it will not exist for example test environment, to prevent this is recommended to inject all of this dependencies by dependency injector because then we can use conditional loading to load some polyfill or configuration that we need.

In this project we are overriding our environment properties with the configurationService.loadConfiguration, if we want to test our httpService we are getting and error because we are not calling this service and we haven't the overrided property of apiUrl and when we check this url is null, to prevent this we can do the next.

> Run in terminal to show the error.
```
npm run test
```

1. Creating and injection Token to our Environment
> Create a file inside the environent called environment.injection.token.ts
```typescript
import { InjectionToken } from "@angular/core";

export const ENVIRONMENT = new InjectionToken('ENVIRONMENT');
```

2. Create the provider config to register it into our app.module.ts
> Create a file inside the environent called environment.provider.ts

```typescript
import { Provider } from "@angular/core";
import { environment } from "./environment";
import { ENVIRONMENT } from "./environment.injectiontoken";

export function environmentProvider(): Provider {
  return {
    provide: ENVIRONMENT,
    useValue: environment
  }
}
```

3. In our app.module.ts add the provider
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    ...
    environmentProvider()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

4. Change in pokemon.service.ts the use of environment to Injected environment.

```typescript
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: EnvironmentSettings

```

5. In every place before we are using environment.apiUrl, now we are going to use this.environment.apiUrl.

6. Override the ENVIRONMENT in our testBed configuration of our pokemon.service in pokemon.service.spec.ts.
```typescript
describe('PokemonService', () => {
  let httpMock: HttpTestingController;
  let service: PokemonService;

  const settings: Partial<EnvironmentSettings> = {
    production: false,
    applicationInsights: {
      instrumentationKey: 'instrumentation'
    },
    apiUrl: 'pokeApi'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PokemonService,
        {
          provide: ENVIRONMENT,
          useValue: settings
        }
      ]
    });
    ...
```

7. Update the test to use the settings.apiUrl to check the url.
```typescript
  describe('getPokemon', () => {
    it(`Should call to ${settings.apiUrl}`, () => {
      service.getPokemon(1).subscribe();

      const httpReq = httpMock.expectOne(settings.apiUrl + '/1');
      expect(httpReq.request.method).toBe('GET');
    });
  });
```

## We are in Green!!!

> Solution in branch: inject-global-dependencies
