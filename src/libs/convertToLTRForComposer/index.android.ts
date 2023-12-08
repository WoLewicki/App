import CONST from '@src/CONST';
import ConvertToLTRForComposer from './types';

/** Android only - We should remove the LTR unicode when the input is empty to prevent: Sending an empty message, metion suggestions not works if @ is the first character; (force option: always remove the unicode, should be used when the user starts writing with @) or placeholder not shows if unicode character is the only remaining character. */
const resetLTRWhenEmpty = (newComment: string, force?: boolean) => {
    const result = newComment.length <= 1 || force ? newComment.replace(CONST.UNICODE.LTR, '') : newComment;
    return result;
};

/**
 * Android only - Do not convert RTL text to a LTR text for input box using Unicode controls.
 * Android does not properly support bidirectional text for mixed content for input box
 */
const convertToLTRForComposer: ConvertToLTRForComposer = (text, isComposerEmpty) => {
    let newText = resetLTRWhenEmpty(text);
    if (newText.startsWith(`${CONST.UNICODE.LTR}@`)) {
        newText = resetLTRWhenEmpty(newText, true);
        return newText;
    }

    return isComposerEmpty ? `${CONST.UNICODE.LTR}${newText}` : newText;
};

/**
 * This is necessary to convert the input to LTR, there is a delay that causes the cursor not to go to the end of the input line when pasting text or typing fast. The delay is caused for the time that takes the input to convert from RTL to LTR and viceversa.
 */
const moveCursorToEndOfLine = (
    commentLength: number,
    setSelection: (
        value: React.SetStateAction<{
            start: number;
            end: number;
        }>,
    ) => void,
) => {
    setSelection({
        start: commentLength + 1,
        end: commentLength + 1,
    });
};

export {moveCursorToEndOfLine};

export default convertToLTRForComposer;
