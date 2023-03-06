import { colors, dimensions } from '@erxes/ui/src/styles';

import { ActionButtons } from '@erxes/ui-settings/src/styles';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

const FolderItemRow = styledTS<{
  isActive?: boolean;
  isChild: boolean | undefined;
}>(styled.li)`
  position: relative;
  background: ${props => (props.isActive ? colors.bgActive : colors.bgLight)};
  border-bottom: 1px solid ${colors.borderPrimary};
  display: flex;
  padding-right: 20px;
  overflow: hidden;

  a {
    padding: ${props =>
      props.isChild ? '10px 0 10px 55px' : '10px 0 10px 40px'};
    white-space: normal;
    display: block;
    color: ${colors.textPrimary};
    position: relative;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    overflow: hidden;
    
    > i {
      font-size: 18px;
      color: ${colors.colorCoreGray};
      transition: all ease 0.3s;
      line-height: 20px;
    }

    span {
      color: ${colors.colorCoreGray};
      padding-left: 5px;
    }

    &:focus {
      color: inherit;
      text-decoration: none;
    }
  }

  &:last-child {
    border: none;
  }

  &:hover {
    background: ${props =>
      props.isActive ? colors.bgActive : colors.colorWhite};
    
    a > i {
      display: none;
    }

    ${ActionButtons} {
      width: 35px;
    }
  }
`;
const RowActions = styled.div`
  font-size: 12px;
  color: ${colors.colorCoreGray};
  padding-right: ${dimensions.coreSpacing}px;

  i {
    padding: ${dimensions.unitSpacing}px 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.div`
  flex: 1;
  cursor: pointer;
  padding: 10px ${dimensions.coreSpacing}px;

  span {
    display: block;
    font-size: 12px;
    color: ${colors.colorCoreGray};
  }
`;

export { FolderItemRow, RowActions, SectionHead, SectionTitle };
