import React, { useState } from 'react';
import { Modal } from './Modal';
import { Copy, Check } from 'lucide-react';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Contact({ isOpen, onClose }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const wechatId = 'ruskacoffee';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="联系方式"
    >
      <div className="text-[#484848] tracking-wide flex items-center justify-between">
        <div>
          <span className="text-[#9B9B9B]">微信：</span>
          <span className="select-all">{wechatId}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 text-[#9B9B9B] hover:text-[#484848] transition-colors rounded-lg hover:bg-[#F8F8F6]"
          aria-label={copied ? "已复制" : "复制微信号"}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </Modal>
  );
}