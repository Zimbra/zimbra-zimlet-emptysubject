import { createElement } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';

import { zimletEventEmitter, callWith } from '@zimbra-client/util';
import { ZIMBRA_ZIMLET_EVENTS } from '@zimbra-client/constants';
import ConfirmModal from './confirm-modal';

const MODAL_ID = 'zimbra-zimlet-emptysubject-dialog';

export const InitializeEvents = ({ context }) => {
	const { dispatch } = context.store;
	const { addModal } = context.zimletRedux.actions.zimlets;
	const { removeModal } = context.zimletRedux.actions.zimlets;

	const onDialogClose = useCallback(
		reject => {
			reject();
			dispatch(removeModal({ id: MODAL_ID }));
		},
		[dispatch, removeModal]
	);

	const onDialogAction = useCallback(
		resolve => {
			resolve();
			dispatch(removeModal({ id: MODAL_ID }));
		},
		[dispatch, removeModal]
	);

	const onSendHandler = useCallback(
		({ message }) =>
			new Promise((resolve, reject) => {
				// Check subject is empty or not
				if (message.subject) {
					resolve();
				} else {
					const modal = (
						<ConfirmModal
							onClose={callWith(onDialogClose, reject)}
							onAction={callWith(onDialogAction, resolve)}
						/>
					);
					dispatch(addModal({ id: MODAL_ID, modal }));
				}
			}),
		[dispatch, addModal, onDialogAction, onDialogClose]
	);

	useEffect(() => {
		zimletEventEmitter.on(ZIMBRA_ZIMLET_EVENTS.ONSEND, onSendHandler, true);

		return () => {
			zimletEventEmitter.off(ZIMBRA_ZIMLET_EVENTS.ONSEND, onSendHandler);
		};
	}, [onSendHandler]);

	return null;
};
