/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Link } from "@components/Link";
import definePlugin from "@utils/types";
import { User } from "discord-types/general";
import virtualMerge from "virtual-merge";


interface UserProfile extends User {
    profileEffectId?: number;
}
let UserEffects = {} as Record<string, string>;

async function loadEffects(noCache = false) {
    UserEffects = {};
    const init = {} as RequestInit;
    if (noCache)
        init.cache = "no-cache";
    const response = await fetch("https://raw.githubusercontent.com/sampathgujarathi/ProfileEffects/main/userprofiles.json", init);
    const data = await response.json();
    UserEffects = data;
}

function getUserEffect(profileId: string) {
    const userEffect = UserEffects[profileId];
    return userEffect || [];
}


export default definePlugin({
    name: "Effecto",
    description: "Use discord profile effects without nitro.",
    authors: [{
        name: "Sampath",
        id: 984015688807100419n
    }],
    async start() {
        await loadEffects();
    },
    patches: [
        {
            find: "UserProfileStore",
            replacement: {
                match: /(?<=getUserProfile\(\i\){return )(\i\[\i\])/,
                replace: "$self.profileDecodeHook($1)"
            }
        }
    ],
    settingsAboutComponent: () => (
        <Link href="https://github.com/sampathgujarathi/ProfileEffects/#how-to-get-profile-effects">CLICK HERE TO GET PROFILE EFFECTS</Link>
    ),
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (user.profileEffectId) return user;
            const profileeffect = getUserEffect(user.userId);
            console.log("users", profileeffect);
            if (profileeffect) {
                return virtualMerge(user, {
                    premiumType: 2,
                    profileEffectId: profileeffect
                });
            }
        }
        return user;
    }
});
