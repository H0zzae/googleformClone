import styled from "styled-components";
import ReactDragList from "react-drag-list";
import {Select} from "@mui/material";
interface Attribute {
    height ?:number;
    width ?:number;
    paddingTop ?:number;
    paddingBottom ?:number;
    paddingRight ?:number;
    paddingLeft?:number;
    gap ?:number;
    justifyContent ?:string;
}
export const DragList = styled(ReactDragList)`
    
`;

export const ResearchDiv = styled.div`
  border: 1px solid #dadce0;
  background-color : #fff;
  margin-top: 12px;
  box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
  //activate
  //box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.141), 0 1px 3px 0 rgba(0,0,0,0.122);;
  border-radius: 8px;
  //border : 0, 0, 0, 4px;
`;

export const TextInputDiv = styled.div`
  padding: 0 12px 0 12px;
`;
export const FlexTopColumn = styled.div<Attribute>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  padding-bottom: ${props => props.paddingBottom||0}px;
  padding-top: ${props => props.paddingTop||0}px;
  gap : ${props => props.gap || 0}px;
`;
export const FlexLeftRow = styled.div<Attribute>`
  display : flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: center;
  height: 100%;
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  padding-bottom: ${props => props.paddingBottom||0}px;
  padding-top: ${props => props.paddingTop||0}px;
  gap : ${props => props.gap || 0}px;
`;

export const FlexRightRow = styled.div<Attribute>`
  display : flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-left: ${props => props.paddingLeft || 0}px;
  padding-right: ${props => props.paddingRight || 0}px;
  padding-bottom: ${props => props.paddingBottom||0}px;
  padding-top: ${props => props.paddingTop||0}px;
  gap : ${props => props.gap || 0}px;
`;

export const CustomHeightDiv = styled.div<Attribute>`
  height : ${props => props.height+'px' || 'fit-content'};
  padding-top : ${props => props.paddingTop||0}px
`;

export const SelectBox = styled(Select)`
  padding: 0;
`;