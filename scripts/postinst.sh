#!/bin/bash
echo "*** Configuring zimbra-zimlet-emptysubject ***"
echo "*** Checking if zimbra-zimlet-emptysubject zimlet is installed. ***"
su - zimbra -c "zmmailboxdctl status"
if [ $? -ne 0 ]; then
   echo "*** Mailbox is not running... ***"
   echo "*** Follow the steps below as zimbra user ignore if installing through install.sh .. ***"
   echo "*** Install the zimbra-zimlet-emptysubject zimlet. ***"
   echo "*** zmzimletctl deploy /opt/zimbra/zimlets-network/zimbra-zimlet-emptysubject.zip ***"
   echo "*** zmprov fc zimlet ***"
else
   echo "*** Deploying zimbra-zimlet-emptysubject zimlet ***"
   su - zimbra -c  "zmzimletctl deploy /opt/zimbra/zimlets-network/zimbra-zimlet-emptysubject.zip"
   su - zimbra -c  "zmprov fc zimlet"
fi
echo "*** zimbra-zimlet-emptysubject Installation Completed. ***"
echo "*** Restart the mailbox service as zimbra user. Run ***"
echo "*** su - zimbra ***"
echo "*** zmmailboxdctl restart ***"
