import { createContext, useContext, useReducer, useMemo } from 'react';
import type { ComponentProps, FunctionComponent, PropsWithChildren, Reducer, Dispatch } from 'react';
import { AnimatePresence } from 'framer-motion';

type CustomModalProps<T = {}> = T & PropsWithChildren<{ closeModal: () => void }>;
type CustomModal = FunctionComponent<CustomModalProps>;

interface ModalState {
  Modal: FunctionComponent<CustomModalProps>;
  props?: {
    [key: string]: any;
  };
}

type ModalAction =
  | { type: 'show'; Modal: CustomModal; props: ModalState['props'] }
  | { type: 'hide'; Modal: CustomModal };

const reducer: Reducer<ModalState[], ModalAction> = (state, action) => {
  const otherModals = state.filter(({ Modal }) => Modal.name !== action.Modal.name);

  switch (action.type) {
    case 'show':
      return [...otherModals, { Modal: action.Modal, props: action.props }];

    case 'hide': {
      return otherModals;
    }

    default:
      return state;
  }
};

const ModalProviderContext = createContext<Dispatch<ModalAction>>(() => {});

export function ModalProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ModalProviderContext.Provider value={dispatch}>
      {children}

      <AnimatePresence>
        {state.map(({ Modal, props }) => {
          return <Modal closeModal={() => dispatch({ type: 'hide', Modal })} key={Modal.name} {...props} />;
        })}
      </AnimatePresence>
    </ModalProviderContext.Provider>
  );
}

/**
 * @description This hook allows you to show/hide and modal component you want by just passing the component.
 * It will return you a show and hide function respectively.
 *
 * @param Modal The modal component you want to show. You can wait for intellisense.
 */
export function useCustomModal<
  TModal extends FunctionComponent<any>,
  TModalProps extends Omit<ComponentProps<TModal>, keyof CustomModalProps>,
  TOpenModalCallback extends keyof TModalProps extends never ? () => void : (props: TModalProps) => void,
>(Modal: TModal): [TOpenModalCallback, () => void] {
  const dispatch = useContext(ModalProviderContext);

  const values = useMemo<[TOpenModalCallback, () => void]>(() => {
    /**
     * We have an error here which should be resolved with TS4.9; however, in the meantime, the error is not
     * a surface-level type error. In this instance, we sacrifice inner type safety for the sake of
     * developer experience (external type safety)
     */
    // @ts-expect-error
    const showFn: TOpenModalCallback = (props) => dispatch({ type: 'show', Modal, props });
    const hideFn = () => dispatch({ type: 'hide', Modal });

    return [showFn, hideFn];
  }, [dispatch, Modal]);

  return values;
}
