/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// This plugin is a port from Alyxia's Vendetta plugin
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Forms } from "@webpack/common";
import { User } from "discord-types/general";
import virtualMerge from "virtual-merge";


interface UserProfile extends User {
    profileEffectId?: number;
}


const decode = (text: string): string => {
    const codePoints = [...(detectSpecialChars(text) ?? "")].map(c => c.codePointAt(0)).filter((cp): cp is number => cp !== undefined);

    const output: string[] = [];
    for (const char of codePoints) {
        if (char !== undefined) {
            output.push(
                String.fromCodePoint(
                    char - (char > 0xe0000 && char < 0xe007f ? 0xe0000 : 0)
                ).toString()
            );
        }
    }
    const result = output.join("");
    return result ?? "";
};



const detectSpecialChars = (text: string): string | null => {
    const codePoints = [...text].map(c => c.codePointAt(0)).filter((cp): cp is number => cp !== undefined);

    const specialChars = codePoints.filter(c => c > 0xe0000 && c < 0xe007f);

    if (specialChars.length > 0) {
        return String.fromCodePoint(...specialChars);
    } else {
        return null;
    }
};


const settings = definePluginSettings({
    nitroFirst: {
        description: "-",
        type: OptionType.SELECT,
        options: [
            { label: "Nitro Effects", value: true, default: true },
            { label: "Fake Effects", value: false },
        ]
    }
});

export default definePlugin({
    name: "Effecto",
    description: "Use discord profile effects without nitro.",
    authors: [Devs.sampath, Devs.Hiftie],
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
        <Forms.FormSection>
            <Forms.FormTitle tag="h3">Usage</Forms.FormTitle>
            <Forms.FormText>
                After enabling this plugin, you will see effects from people also using Effecto. <br />
                To set Profile effects:
                <ul>
                    <li>• Go to https://github.com/sampathgujarathi/Effecto/blob/main/README.md</li>
                    <li>Copy id</li>
                    <li>Paste id at the end of bio so that it will be easy to remove, Save it and enjoy!!</li>
                </ul><br />
            </Forms.FormText>
        </Forms.FormSection>),
    settings,
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (settings.store.nitroFirst && user.profileEffectId) return user;
            const profileeffect = decode(user.bio);
            if (profileeffect) {
                return virtualMerge(user, {
                    premiumType: 2,
                    profileEffectId: `${profileeffect}`
                });
            }
        }
        return user;
    }
});
