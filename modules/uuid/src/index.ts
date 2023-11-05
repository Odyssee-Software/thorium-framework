import { } from 'uuid';

export type FixedLengthString<Length extends number> = string & { __fixedLength: Length };
export type ComponentId = FixedLengthString<12>;
export type Segment = FixedLengthString<4>;
export type ParentSegementId = `${Segment}-${Segment}-${Segment}`;
export type CollectionId = FixedLengthString<12>;
export type HUID = `${ComponentId}-${ParentSegementId}-${CollectionId}`;

/** Defining an interface called `HierarchicalUUIDOptions` in TypeScript. This
interface has two optional properties: `parentId` and `collectionId`, both of which are of type
`FixedLengthString<12>`. */
export interface HierarchicalUUIDOptions{

  /** Defines a variable called `parentId` with an
  optional type of `FixedLengthString<12>`. The `FixedLengthString` is likely a custom type that
  represents a string with a fixed length of 12 characters. The `?` symbol indicates that the
  `parentId` variable is optional, meaning it can be assigned a value or left undefined. */
  parentId?:FixedLengthString<12>;

  /** Defining a TypeScript interface or class with a property called `collectionId`.
  The `collectionId` property is optional and its type is `FixedLengthString<12>`. */
  collectionId?:FixedLengthString<12>;

}

/** The _HUID class is a TypeScript class that extends the String class and provides methods to extract
different sections of a hierarchical unique identifier. */
export class _HUID extends String{

  /**
   * The function returns the component ID by splitting the string and extracting the first part.
   * @returns The componentId is being returned.
   */
  get componentId(){ return this.split('-')[0] as ComponentId; }
  /**
   * The function returns the first three characters of the second segment after splitting a string by
   * '-'.
   * @returns the second segment of the string, after splitting it by '-'. The returned value is a
   * substring of the second segment, consisting of the first three characters.
   */
  get section1(){ return this.split('-')[1] as Segment; }
  /**
   * The function returns the third segment of a string after splitting it by hyphens and extracting a
   * substring.
   * @returns the third segment of the string after splitting it by '-' and then extracting a substring
   * from index 4 to 7.
   */
  get section2(){ return this.split('-')[2] as Segment; }
  /**
   * The function returns the fourth segment of a string after splitting it by hyphens and then
   * extracts a substring from index 8 to 11.
   * @returns the fourth segment of the string after splitting it by hyphens, and then extracting a
   * substring from index 8 to 12. The returned value is of type "Segment".
   */
  get section3(){ return this.split('-')[3] as Segment; }
  /**
   * The function extracts the collection ID from a string by splitting it and returning the fifth
   * element.
   * @returns The collectionId is being returned.
  */
  get collectionId(){ return this.split('-')[4] as CollectionId; }

  /**
   * The function returns the concatenation of three section IDs as a fixed-length string of 12
   * characters.
   * @returns The method `parentId` returns a string that is the concatenation of `this.section1`,
   * `this.section2`, and `this.section3`. The returned string is of type `FixedLengthString<12>`,
   * which means it has a fixed length of 12 characters.
   */
  get parentId(){ return [this.section1,this.section2,this.section3].join('') as FixedLengthString<12>; }

  /**
   * The function extends the HierarchicalUUIDOptions object with default values and returns a
   * hierarchical UUID.
   * @param {HierarchicalUUIDOptions} [options] - The `options` parameter is an optional object that
   * can be passed to the `extend` function. It allows you to customize the behavior of the function by
   * providing values for the following properties:
   * @returns a Hierarchical UUID (Universally Unique Identifier) generated using the `uuid.hv1`
   * method. The `parentId` and `collectionId` values are passed as parameters to the `uuid.hv1`
   * method.
   */
  extend(options?:HierarchicalUUIDOptions){

    return uuid.hv1({
      parentId : this.componentId,
      collectionId : this.collectionId,
    })

  }

}

export class uuid{

  /**
   * The function returns a component ID as a string.
   * @returns The value being returned is '000000000000' as a ComponentId.
   */
  static get componentId(){ return '000000000000' as ComponentId; }
  /**
   * The function returns the segment '0000' as a Segment type in TypeScript.
   * @returns The value being returned is '0000' as a Segment.
   */
  static get segment1(){ return '0000' as Segment; }
  /**
   * The function returns the segment '0000' as a TypeScript type Segment.
   * @returns The value being returned is '0000' as a Segment.
  */
  static get segment2(){ return '0000' as Segment; }
  /**
   * The function returns the segment '0000' as a Segment type in TypeScript.
   * @returns The value being returned is '0000' as a Segment.
   */
  static get segment3(){ return '0000' as Segment; }

  /**
   * The function returns a specific collection ID as a string.
   * @returns The value '000000000000' as a CollectionId.
   */
  static get collectionId(){ return '000000000000' as CollectionId; }

  /**
   * The above function returns a string that combines various UUID segments.
   * @returns The code is returning a string that consists of the values of `uuid.componentId`,
   * `uuid.segment1`, `uuid.segment2`, `uuid.segment3`, and `uuid.collectionId` concatenated together
   * with hyphens ("-") separating them.
   */
  static get NIL(){ return new _HUID(`${uuid.componentId}-${uuid.segment1}-${uuid.segment2}-${uuid.segment3}-${uuid.collectionId}`); }

  /**
   * The `encode` function takes a string of fixed length and replaces certain characters with random
   * hexadecimal values.
   * @param chaine - The parameter `chaine` is of type `FixedLengthString<N>`, which is a string with a
   * fixed length. The length of the string is determined by the generic type `N`, which extends the
   * `number` type and can only be either `4` or `12`.
   * @returns a value of type `FixedLengthString<N> | FixedLengthString<N>`.
   */
  static encode< N extends number = 4 | 12 >( chaine:FixedLengthString<N> ){
    return chaine.replace(/[018]/g, (c:any) =>
    {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    }) as FixedLengthString<N> | FixedLengthString<N>
  }

  /**
   * The function generates a version 4 UUID using random values from the crypto library.
   * @returns a version 4 UUID (Universally Unique Identifier) as a string in the format
   * "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", where each "x" represents a hexadecimal digit.
   */
  static v4(  ) {

    return uuid.NIL.replace(/[018]/g, (c:any) =>
      {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      }
    ) as `${string}-${string}-${string}-${string}-${string}`;

  }

  /**
   * The function `hv1` generates a hierarchical UUID based on the provided options, including a parent
   * ID and collection ID.
   * @param {HierarchicalUUIDOptions} [options] - The `options` parameter is an optional object that
   * can contain the following properties:
   * @returns a new Hierarchical UUID (_HUID) which is constructed by concatenating the componentId,
   * segment1, segment2, segment3, and collectionId together with hyphens ("-") in between.
   */
  static hv1( options?:HierarchicalUUIDOptions ) {

    if(!options)options = {
      parentId : null,
      collectionId : null
    };

    let componentId = uuid.encode( uuid.componentId );
    let segment1 = uuid.encode( uuid.segment1 );
    let segment2 = uuid.encode( uuid.segment2 );
    let segment3 = uuid.encode( uuid.segment3 );
    let collectionId = uuid.encode( uuid.collectionId );

    if(options.parentId && options.parentId.length == 12){
      segment1 = options.parentId.slice(0,4) as FixedLengthString<4>;
      segment2 = options.parentId.slice(4,8) as FixedLengthString<4>;
      segment3 = options.parentId.slice(8,12) as FixedLengthString<4>;
    }
    else console.error( 'parentId.length exeded 12 char length.' )

    if(options.collectionId)collectionId = options.collectionId;

    return new _HUID(`${ componentId }-${ segment1 }-${ segment2 }-${ segment3 }-${ collectionId }`);

  }

}

// 
// TEST ZONE
// 

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let createIdRange = ( parentHuid:_HUID , deep : number = 0 ) => {

  return Array.from( { length : getRandomInt(0 , 4) } , ( i ) => {
    let result:_HUID[] | _HUID = parentHuid.extend();
    if(deep < 5)result = [ result , ...createIdRange( result , deep + 1 ) ];
    return result;
  }).flat() as _HUID[];

}

(() => {

  let id = uuid.v4();

  let rootId = uuid.NIL;
  let range = [ rootId , ...createIdRange( rootId ) ];
  console.log({range});

})()