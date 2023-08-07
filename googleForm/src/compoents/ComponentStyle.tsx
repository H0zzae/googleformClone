import styled from "styled-components";
import ReactDragList from "react-drag-list";

export const GroupBox = styled(ReactDragList)`
    
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