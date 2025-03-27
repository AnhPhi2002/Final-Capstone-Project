'use client';

import React, { forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from './button';

interface ResponsiveDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}

// Sử dụng forwardRef để truyền ref vào component
export const ResponsiveDialog = forwardRef<HTMLDivElement, ResponsiveDialogProps>(
  ({ children, isOpen, setIsOpen, title, description }, ref) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent ref={ref} className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent ref={ref}>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DrawerHeader>
          {children}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button >Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);

// Đặt displayName để tránh cảnh báo trong dev tools
ResponsiveDialog.displayName = 'ResponsiveDialog';