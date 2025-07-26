'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Quote,
  Type,
  Eye,
  Edit
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = '请输入内容...',
  className = '',
  minHeight = '200px'
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 格式化工具
  const formatText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = 
      value.substring(0, start) + 
      before + selectedText + after + 
      value.substring(end);
    
    onChange(newText);
    
    // 恢复光标位置
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 工具栏按钮
  const toolbarButtons = [
    { 
      icon: Bold, 
      title: '粗体', 
      action: () => formatText('**', '**'),
      shortcut: 'Ctrl+B'
    },
    { 
      icon: Italic, 
      title: '斜体', 
      action: () => formatText('*', '*'),
      shortcut: 'Ctrl+I'
    },
    { 
      icon: Underline, 
      title: '下划线', 
      action: () => formatText('<u>', '</u>'),
      shortcut: 'Ctrl+U'
    },
    { 
      icon: Type, 
      title: '标题', 
      action: () => formatText('## '),
      shortcut: 'Ctrl+H'
    },
    { 
      icon: Quote, 
      title: '引用', 
      action: () => formatText('> '),
      shortcut: 'Ctrl+Q'
    },
    { 
      icon: List, 
      title: '无序列表', 
      action: () => formatText('- '),
      shortcut: 'Ctrl+L'
    },
    { 
      icon: ListOrdered, 
      title: '有序列表', 
      action: () => formatText('1. '),
      shortcut: 'Ctrl+Shift+L'
    },
    { 
      icon: Link, 
      title: '链接', 
      action: () => formatText('[', '](url)'),
      shortcut: 'Ctrl+K'
    },
  ];

  // 快捷键处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatText('**', '**');
          break;
        case 'i':
          e.preventDefault();
          formatText('*', '*');
          break;
        case 'u':
          e.preventDefault();
          formatText('<u>', '</u>');
          break;
        case 'h':
          e.preventDefault();
          formatText('## ');
          break;
        case 'q':
          e.preventDefault();
          formatText('> ');
          break;
        case 'l':
          e.preventDefault();
          if (e.shiftKey) {
            formatText('1. ');
          } else {
            formatText('- ');
          }
          break;
        case 'k':
          e.preventDefault();
          formatText('[', '](url)');
          break;
      }
    }
  };

  // 简单的 Markdown 预览渲染
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$1. $2</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className={`border border-secondary-200 dark:border-secondary-600 rounded-lg overflow-hidden ${className}`}>
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-700 border-b border-secondary-200 dark:border-secondary-600">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={button.action}
                title={`${button.title} (${button.shortcut})`}
                className="p-2 rounded hover:bg-secondary-200 dark:hover:bg-secondary-600 text-secondary-600 dark:text-secondary-300 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            );
          })}
        </div>

        {/* 预览切换 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
              !isPreview 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
            }`}
          >
            <Edit className="w-3 h-3" />
            <span>编辑</span>
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
              isPreview 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                : 'text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>预览</span>
          </button>
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="relative">
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-4 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-400 resize-none focus:outline-none"
          />
        ) : (
          <div 
            style={{ minHeight }}
            className="p-4 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>

      {/* 底部状态栏 */}
      <div className="flex items-center justify-between p-2 bg-secondary-50 dark:bg-secondary-700 border-t border-secondary-200 dark:border-secondary-600 text-xs text-secondary-500 dark:text-secondary-400">
        <div className="flex items-center space-x-4">
          <span>字符数: {value.length}</span>
          <span>行数: {value.split('\n').length}</span>
        </div>
        <div>
          支持 Markdown 语法
        </div>
      </div>
    </div>
  );
} 