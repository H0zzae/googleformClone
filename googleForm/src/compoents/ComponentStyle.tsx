import styled from "styled-components";
import ReactDragList from "react-drag-list";
import {Select, Typography} from "@mui/material";
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

export const PurpleLineDiv = styled.div`
  height : 10px;
  width : 100%;
  background : rgb(103, 58, 183);
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px 8px 0 0;
`;
export const ResearchDiv = styled.div<{ activated?: boolean }>`
  position: relative;
  border: 1px solid #dadce0;
  background-color : #fff;
  margin-top: 12px;
  //activate
  box-shadow: ${props => props.activated ? 
          '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.141), 0 1px 3px 0 rgba(0,0,0,0.122);'
          : 'inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);'};
  padding: ${props => props.activated ? '24px 24px 0 24px;' : '24px'};
  border-radius: 8px;
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
`

export const FloatingBar = styled.div`
  width: 48px;
  display: flex;
  position: absolute;
  top: 150px;
  right: -62px;
  flex-direction: column;
  align-items: center;
  -webkit-transition: all .3s cubic-bezier(0.4,0,0.2,1);
  transition: all .3s cubic-bezier(0.4,0,0.2,1);
  border: 1px solid #dadce0;
  background-color : #fff;
  margin-top: 12px;
  box-shadow: 1px 1px 0 rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.07), 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.141), 0 1px 3px 0 rgba(0,0,0,0.122);
  border-radius: 8px;
  gap:2px;
  padding : 8px 0;
`;

export const RedText = styled(Typography)`
  color : rgb(217,48,37);
  font-weight: 400;
  letter-spacing: .2px;
`
export const BlueBox = styled.div`
  position: absolute;
  background-color: rgb(67, 133, 244);
  width : 6px;
  height : 100%;
  left : 0;
  top : 0;
  border-radius: 8px 0 0 8px;
`;