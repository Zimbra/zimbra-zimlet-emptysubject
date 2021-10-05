import { createElement } from 'preact';
import { Text } from 'preact-i18n';

import { withIntl } from '../enhancers';
import { ModalDialog } from '@zimbra-client/components';

const ConfirmModal = ({ onClose, onAction }) => {
	return (
		<ModalDialog
			title="noSubject.title"
			onAction={onAction}
			onClose={onClose}
			actionLabel="noSubject.sendAnyway"
		>
			<p>
				<Text id="noSubject.description" />
			</p>
		</ModalDialog>
	);
};

export default withIntl()(ConfirmModal);
