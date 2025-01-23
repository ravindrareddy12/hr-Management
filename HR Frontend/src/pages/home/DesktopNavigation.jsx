import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import navigation from './navigation';

export default function DesktopNavigation() {
  return (
    <div className="hidden lg:flex lg:space-x-6">
      {navigation.categories.map((category) => (
        <Popover key={category.name}>
          <PopoverButton>{category.name}</PopoverButton>
          <PopoverPanel>
            <div className="grid grid-cols-4 gap-4">
              {category.featured.map((item) => (
                <a key={item.name} href={item.href}>
                  <img src={item.imageSrc} alt={item.imageAlt} className="rounded-md" />
                  <p>{item.name}</p>
                </a>
              ))}
            </div>
          </PopoverPanel>
        </Popover>
      ))}
    </div>
  );
}
