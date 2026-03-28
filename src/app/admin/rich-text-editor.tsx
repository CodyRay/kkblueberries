'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useState } from 'react'
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletIcon,
} from '@heroicons/react/20/solid'

interface RichTextEditorProps {
  name: string
  defaultValue?: string
}

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-grey-200 text-grey-950'
          : 'text-grey-600 hover:bg-grey-100 hover:text-grey-950'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ name, defaultValue = '' }: RichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, codeBlock: false, blockquote: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  })

  const setLink = () => {
    const url = window.prompt('URL', editor?.getAttributes('link').href ?? '')
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  return (
    <div className="rounded-lg ring-1 ring-grey-300 focus-within:ring-2 focus-within:ring-grey-500 bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-grey-200 bg-grey-50">
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive('bold')}
        >
          <BoldIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive('italic')}
        >
          <ItalicIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive('bulletList')}
        >
          <ListBulletIcon className="size-4" />
        </ToolbarButton>
        <div className="w-px h-4 bg-grey-200 mx-1" />
        <ToolbarButton onClick={setLink} active={editor?.isActive('link')}>
          <LinkIcon className="size-4" />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-3 py-2 min-h-[6rem] focus:outline-none"
      />

      <input type="hidden" name={name} value={html} readOnly />
    </div>
  )
}
