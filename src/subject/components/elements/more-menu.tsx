import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core';
import React, { FC, ReactNode } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

export type MoreMenuProps = {
  isEditable?: boolean;
  isDeletable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  trigger?: ReactNode;
};

export const MoreMenu: FC<MoreMenuProps> = ({
  isDeletable,
  isEditable,
  onEdit,
  onDelete,
  trigger,
}) => (
  <Menu>
    <MenuButton>
      {trigger || (
        <IconButton
          aria-label=""
          bg="transparent"
          size="lg"
          variant="ghost"
          variantColor="grey"
          borderRadius="none"
          icon={FiMoreHorizontal}
        />
      )}
    </MenuButton>
    <MenuList borderRadius="none">
      {isEditable && (
        <MenuItem color="blue.800" fontWeight="semibold" onClick={onEdit}>
          edit
        </MenuItem>
      )}
      {isDeletable && (
        <MenuItem color="red.500" fontWeight="semibold" onClick={onDelete}>
          delete
        </MenuItem>
      )}
    </MenuList>
  </Menu>
);
