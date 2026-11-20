import { useState } from 'react';
import { formatHtml, minifyHtml, validateHtml } from '../utils/html';

type HtmlAction = 'format' | 'minify' | 'validate';

export const useHtmlFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateInput = (value: string) => {
    setInput(value);
    setError('');
    setSuccess('');
    setCopied(false);
  };

  const processHtml = async (action: HtmlAction) => {
    if (!input.trim()) {
      setOutput('');
      setError('Enter HTML markup first.');
      setSuccess('');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess('');
    setCopied(false);

    try {
      if (action === 'validate') {
        const result = await validateHtml(input);

        if (!result.isValid) {
          setError(result.error ?? 'Invalid HTML markup.');
          return;
        }

        setSuccess('HTML syntax parsed successfully.');
        return;
      }

      const result =
        action === 'format'
          ? await formatHtml({ html: input })
          : await minifyHtml(input);

      if (result.error) {
        setError(result.error);
        setOutput('');
        return;
      }

      setOutput(result.output);
      setSuccess(
        action === 'format'
          ? 'HTML formatted successfully.'
          : 'HTML minified successfully.',
      );
    } catch {
      setError('Something went wrong while processing HTML.');
      setOutput('');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setError('');
    } catch {
      setCopied(false);
      setError('Unable to copy HTML to clipboard.');
    }
  };

  const downloadOutput = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: 'text/html;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'formatted.html';
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
    setSuccess('');
    setCopied(false);
  };

  return {
    state: {
      input,
      output,
      error,
      success,
      copied,
      isProcessing,
      hasInput: Boolean(input.trim()),
      hasOutput: Boolean(output),
    },
    updateInput,
    format: () => processHtml('format'),
    minify: () => processHtml('minify'),
    validate: () => processHtml('validate'),
    copyOutput,
    downloadOutput,
    clear,
  };
};
