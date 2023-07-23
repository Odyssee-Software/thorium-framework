import { useState , State} from "/Users/guillaume/Documents/Thorium/thorium-states";
import { ConnectorTemplate , NodeTemplate } from "/Users/guillaume/Documents/Thorium/thorium-core";

export const elementState = <T>(data:any):[State<T>,(value:T) => T,(template?:(ConnectorTemplate<HTMLParagraphElement>  & {localName? : 'span' | 'input'})) => NodeTemplate<HTMLSpanElement>] => {

  let [state,callback] = useState<T>(data);
  let stateElement = (template?:ConnectorTemplate<HTMLSpanElement> & {localName? : 'span' | 'input'}):NodeTemplate<any> => {

    let localName = ( template && template.localName ? template.localName : 'span' );

    return {
      localName : localName,
      attr : { ...( template && template.attr ? template.attr : ( localName == 'span' ? { text : state.value as string } : {})) },
      childrens : [ ...( template && template.childrens ? template.childrens : []) ],
      proto : { ...( template && template.proto ? template.proto : {
        ...( localName == 'input' ? { value : state.value } : {} ),
        afterMounting( target:HTMLSpanElement|HTMLInputElement ){

          if(localName == 'span')target.textContent = state.value as string;
          if(localName == 'input')(target as HTMLInputElement).value = state.value as string;

          state.subscribe( target , (value) => {
            if(localName == 'span')target.textContent = `${value}`;
            if(localName == 'input')(target as HTMLInputElement).value = `${value}`;
          } )

        }
      }) }
    }
  }
  return [state,callback,stateElement];

}