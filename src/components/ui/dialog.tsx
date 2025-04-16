import React, { Fragment } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { cn } from '../../lib/utils'
import { MdClose } from 'react-icons/md'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

// Add a style to the head element for handling body scroll locking
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = `
    body.dialog-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  `
  document.head.appendChild(style)
}

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className={cn(
                "w-full max-w-md transform overflow-hidden rounded-lg bg-background border border-border p-6 text-left align-middle shadow-xl transition-all",
                className
              )}>
                {title && (
                  <div className="flex items-center justify-between mb-4">
                    <HeadlessDialog.Title
                      as="h3"
                      className="text-xl font-bold leading-6 text-green-500 dark:text-primary"
                    >
                      {title}
                    </HeadlessDialog.Title>
                    <button
                      type="button"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                      onClick={onClose}
                      aria-label="Затвори диалога"
                      title="Затвори"
                    >
                      <MdClose />
                    </button>
                  </div>
                )}
                <div className="mt-2 text-foreground">
                  {children}
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
} 