export type PreloadStack = PreloadModule<any>[] & {
  execute():Promise<any[]>;
};

/* The `preloadStack` constant is an instance of a class that extends the `Array` class. It represents
a stack of preload modules that need to be executed. */
const preloadStack:PreloadStack = new class extends Array{

  /**
   * The function executes a series of asynchronous modules and returns an array of their results.
   * @returns The `execute` function returns an array of results.
  */
  async execute(){

    let results = [];

    if(this.length > 0){
      results = await Promise.all( Array.from( this , (module) => {
        return module.main();
      } ) )
      // for await (const module of this){
      //   results.push(await module.main());
      // }
    }

    return results;

  }

};

/* The `export interface PreloadModule<T = void>` is defining an interface called `PreloadModule` that
has a generic type parameter `T`. This interface has a single method `main()` that returns a value
of type `T`. The default value for `T` is `void`, meaning that if no type argument is provided when
using this interface, the return type of `main()` will be `void`. */
export interface PreloadModule<T = void>{
  main():T;
}

export interface PreloadAPI{
  push(item:PreloadModule):PreloadStack['push'];
  execute:PreloadStack['execute']
}

/**
 * The function returns the preload stack.
 * @returns the value of the variable `preloadStack`.
*/
export function preload():PreloadAPI{

  return new Proxy( (preloadStack as any) , {
    get( target , key ){
      if(target[key])return target[key];
      else console.warn( `${String(key)} is not a property of preload API` );
    }
  } )
  
}