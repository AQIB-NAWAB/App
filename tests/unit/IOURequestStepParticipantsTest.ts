import {shouldAutoReportToPolicyExpenseChat} from '@pages/iou/request/step/IOURequestStepParticipants';
import CONST from '@src/CONST';
import type {Policy} from '@src/types/onyx/Policy';

describe('IOURequestStepParticipants - shouldAutoReportToPolicyExpenseChat', () => {
    const basePolicy: Policy = {
        id: '123',
        name: 'Workspace',
        role: CONST.POLICY.ROLE.ADMIN,
        type: CONST.POLICY.TYPE.TEAM,
        owner: 'owner@test.com',
        outputCurrency: CONST.CURRENCY.USD,
        isPolicyExpenseChatEnabled: true,
    };

    it('returns true when participant is not a policy expense chat', () => {
        expect(
            shouldAutoReportToPolicyExpenseChat({
                action: CONST.IOU.ACTION.CREATE,
                isPolicyExpenseChat: false,
                policy: basePolicy,
            }),
        ).toBe(true);
    });

    it('returns true when action is not create', () => {
        expect(
            shouldAutoReportToPolicyExpenseChat({
                action: CONST.IOU.ACTION.EDIT,
                isPolicyExpenseChat: true,
                policy: basePolicy,
            }),
        ).toBe(true);
    });

    it('returns true when workflows are disabled but workspace chat is enabled', () => {
        expect(
            shouldAutoReportToPolicyExpenseChat({
                action: CONST.IOU.ACTION.CREATE,
                isPolicyExpenseChat: true,
                policy: {...basePolicy, autoReporting: false},
            }),
        ).toBe(true);
    });

    it('returns false when workspace chat is disabled on the policy', () => {
        expect(
            shouldAutoReportToPolicyExpenseChat({
                action: CONST.IOU.ACTION.CREATE,
                isPolicyExpenseChat: true,
                policy: {...basePolicy, isPolicyExpenseChatEnabled: false},
            }),
        ).toBe(false);
    });

    it('returns true when policy data is unavailable', () => {
        expect(
            shouldAutoReportToPolicyExpenseChat({
                action: CONST.IOU.ACTION.CREATE,
                isPolicyExpenseChat: true,
                policy: undefined,
            }),
        ).toBe(true);
    });
});
