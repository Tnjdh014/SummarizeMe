import React, { useState, useEffect } from 'react';
import { T5ForConditionalGeneration, T5Tokenizer } from '@huggingface/transformers';

const SummaryComponent = ({ pdfFile }) => {
  const [summary, setSummary] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (pdfFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        setText(fileData);
      };
      reader.readAsText(pdfFile);
    }
  }, [pdfFile]);

  const generateSummary = async () => {
    if (text) {
      const model = new T5ForConditionalGeneration.from_pretrained('utrobinmv/t5_summary_en_ru_zh_base_2048');
      const tokenizer = new T5Tokenizer.from_pretrained('utrobinmv/t5_summary_en_ru_zh_base_2048');
      const prefix = 'summary: ';
      const src_text = prefix + text;
      const input_ids = tokenizer(src_text, { return_tensors: 'pt' });

      const generatedTokens = await model.generate(input_ids);
      const result = tokenizer.batch_decode(generatedTokens, { skip_special_tokens: true });
      setSummary(result);
    } else {
      alert('Please upload a PDF file first.');
    }
  };

  return (
    <div>
      <button onClick={generateSummary}>Generate Summary</button>
      <div>{summary}</div>
    </div>
  );
};

export default SummaryComponent;

