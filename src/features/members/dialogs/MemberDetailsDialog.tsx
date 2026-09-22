import type { Profile } from "@/types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shared/components/ui/tabs";
import MemberInfoTab from "../tabs/MemberInfoTab";
import MemberContributionsTab from "../tabs/MemberContributionsTab";

interface Props {
    member: Profile | null;
    open: boolean;
    onClose(): void;
}

export default function MemberDetailsDialog({
    member,
    open,
    onClose,
}: Props) {

    if (!member) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {

                if (!isOpen) {

                    onClose();

                }

            }}
        >
            <DialogContent className="max-w-4xl">

                <DialogHeader>

                    <DialogTitle>

                        Fiche membre

                    </DialogTitle>

                </DialogHeader>

                <Tabs defaultValue="info">

                    <TabsList className="grid w-full grid-cols-2">

                        <TabsTrigger value="info">

                            Informations

                        </TabsTrigger>

                        <TabsTrigger value="cotisations">

                            Cotisations

                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="info">

                        <MemberInfoTab
                            member={member}
                        />

                    </TabsContent>

                    <TabsContent value="cotisations">

                        <MemberContributionsTab
                            profileId={member.id}
                        />

                    </TabsContent>

                </Tabs>
            </DialogContent>

        </Dialog>
    );
}