import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TabGroup, TabList, TabPanel, TabPanels,Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import navigation from './navigation'; // Place navigation data here

export default function MobileMenu({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-black/25" />
      <div className="fixed inset-0 z-40 flex">
        <DialogPanel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <TabGroup>
            <TabList className="flex space-x-8 px-4 border-b">
              {navigation.categories.map((category) => (
                <Tab key={category.name} className="text-gray-700">
                  {category.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {navigation.categories.map((category) => (
                <TabPanel key={category.name}>
                  <div className="grid grid-cols-2 gap-4 px-4 py-6">
                    {category.featured.map((item) => (
                      <div key={item.name}>
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          className="w-full h-auto object-cover rounded-md"
                        />
                        <p className="text-sm">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
