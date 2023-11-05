export type FixedLengthString<Length extends number> = string & {
    __fixedLength: Length;
};
export type ComponentId = FixedLengthString<12>;
export type Segment = FixedLengthString<4>;
export type ParentSegementId = `${Segment}-${Segment}-${Segment}`;
export type CollectionId = FixedLengthString<12>;
export type HUID = `${ComponentId}-${ParentSegementId}-${CollectionId}`;
/** Defining an interface called `HierarchicalUUIDOptions` in TypeScript. This
interface has two optional properties: `parentId` and `collectionId`, both of which are of type
`FixedLengthString<12>`. */
export interface HierarchicalUUIDOptions {
    /** Defines a variable called `parentId` with an
    optional type of `FixedLengthString<12>`. The `FixedLengthString` is likely a custom type that
    represents a string with a fixed length of 12 characters. The `?` symbol indicates that the
    `parentId` variable is optional, meaning it can be assigned a value or left undefined. */
    parentId?: FixedLengthString<12>;
    /** Defining a TypeScript interface or class with a property called `collectionId`.
    The `collectionId` property is optional and its type is `FixedLengthString<12>`. */
    collectionId?: FixedLengthString<12>;
}
/** The _HUID class is a TypeScript class that extends the String class and provides methods to extract
different sections of a hierarchical unique identifier. */
export declare class _HUID extends String {
    /**
     * The function returns the component ID by splitting the string and extracting the first part.
     * @returns The componentId is being returned.
     */
    get componentId(): ComponentId;
    /**
     * The function returns the first three characters of the second segment after splitting a string by
     * '-'.
     * @returns the second segment of the string, after splitting it by '-'. The returned value is a
     * substring of the second segment, consisting of the first three characters.
     */
    get section1(): Segment;
    /**
     * The function returns the third segment of a string after splitting it by hyphens and extracting a
     * substring.
     * @returns the third segment of the string after splitting it by '-' and then extracting a substring
     * from index 4 to 7.
     */
    get section2(): Segment;
    /**
     * The function returns the fourth segment of a string after splitting it by hyphens and then
     * extracts a substring from index 8 to 11.
     * @returns the fourth segment of the string after splitting it by hyphens, and then extracting a
     * substring from index 8 to 12. The returned value is of type "Segment".
     */
    get section3(): Segment;
    /**
     * The function extracts the collection ID from a string by splitting it and returning the fifth
     * element.
     * @returns The collectionId is being returned.
    */
    get collectionId(): CollectionId;
    /**
     * The function returns the concatenation of three section IDs as a fixed-length string of 12
     * characters.
     * @returns The method `parentId` returns a string that is the concatenation of `this.section1`,
     * `this.section2`, and `this.section3`. The returned string is of type `FixedLengthString<12>`,
     * which means it has a fixed length of 12 characters.
     */
    get parentId(): FixedLengthString<12>;
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
    extend(options?: HierarchicalUUIDOptions): _HUID;
}
export declare class uuid {
    /**
     * The function returns a component ID as a string.
     * @returns The value being returned is '000000000000' as a ComponentId.
     */
    static get componentId(): ComponentId;
    /**
     * The function returns the segment '0000' as a Segment type in TypeScript.
     * @returns The value being returned is '0000' as a Segment.
     */
    static get segment1(): Segment;
    /**
     * The function returns the segment '0000' as a TypeScript type Segment.
     * @returns The value being returned is '0000' as a Segment.
    */
    static get segment2(): Segment;
    /**
     * The function returns the segment '0000' as a Segment type in TypeScript.
     * @returns The value being returned is '0000' as a Segment.
     */
    static get segment3(): Segment;
    /**
     * The function returns a specific collection ID as a string.
     * @returns The value '000000000000' as a CollectionId.
     */
    static get collectionId(): CollectionId;
    /**
     * The above function returns a string that combines various UUID segments.
     * @returns The code is returning a string that consists of the values of `uuid.componentId`,
     * `uuid.segment1`, `uuid.segment2`, `uuid.segment3`, and `uuid.collectionId` concatenated together
     * with hyphens ("-") separating them.
     */
    static get NIL(): _HUID;
    /**
     * The `encode` function takes a string of fixed length and replaces certain characters with random
     * hexadecimal values.
     * @param chaine - The parameter `chaine` is of type `FixedLengthString<N>`, which is a string with a
     * fixed length. The length of the string is determined by the generic type `N`, which extends the
     * `number` type and can only be either `4` or `12`.
     * @returns a value of type `FixedLengthString<N> | FixedLengthString<N>`.
     */
    static encode<N extends number = 4 | 12>(chaine: FixedLengthString<N>): FixedLengthString<N>;
    /**
     * The function generates a version 4 UUID using random values from the crypto library.
     * @returns a version 4 UUID (Universally Unique Identifier) as a string in the format
     * "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", where each "x" represents a hexadecimal digit.
     */
    static v4(): `${string}-${string}-${string}-${string}-${string}`;
    /**
     * The function `hv1` generates a hierarchical UUID based on the provided options, including a parent
     * ID and collection ID.
     * @param {HierarchicalUUIDOptions} [options] - The `options` parameter is an optional object that
     * can contain the following properties:
     * @returns a new Hierarchical UUID (_HUID) which is constructed by concatenating the componentId,
     * segment1, segment2, segment3, and collectionId together with hyphens ("-") in between.
     */
    static hv1(options?: HierarchicalUUIDOptions): _HUID;
}
