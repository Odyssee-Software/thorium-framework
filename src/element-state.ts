import { useState , State} from "../modules/states";
import { IConnectorTemplate , INodeTemplate } from "thorium-core";

export const elementState = <T>(data:any):[State<T>,(value:T) => T,(template?:(IConnectorTemplate<HTMLParagraphElement>  & {localName? : 'span' | 'input'})) => INodeTemplate<HTMLSpanElement>] => {

  let [state,callback] = useState<T>(data);
  let stateElement = (template?:IConnectorTemplate<HTMLSpanElement> & {localName? : 'span' | 'input'}):INodeTemplate<any> => {

    let localName = ( template && template.localName ? template.localName : 'span' );

    return {
      localName : localName,
      attr : { ...( template && template.attr ? template.attr : ( localName == 'span' ? { text : state.value as string } : {})) } as any,
      childrens : [ ...( template && template.childrens ? template.childrens : []) ],
      proto : { ...( template && template.proto ? template.proto : {
        ...( localName == 'input' ? { value : state.value } : {} ),
        afterMounting( target:HTMLSpanElement|HTMLInputElement ){

          if(localName == 'span')target.textContent = state.value as string;
          if(localName == 'input')(target as HTMLInputElement).value = state.value as string;

          state.subscribe( target , (value:any) => {
            if(localName == 'span')target.textContent = `${value}`;
            if(localName == 'input')(target as HTMLInputElement).value = `${value}`;
            return null;
          } )

        }
      }) }
    }
  }
  return [state,callback,stateElement];

}