วิธีที่ 1: ตั้งค่าผ่าน Command Palette

กด Cmd+Shift+P เพื่อเปิด Command Palette
พิมพ์ Preferences: Open Keyboard Shortcuts (JSON)
เพิ่มโค้ดนี้เข้าไป:

{
  "key": "cmd+d",
  "command": "editor.action.copyLinesDownAction",
  "when": "editorTextFocus && !editorReadonly"
}

วิธีที่ 2: ตั้งค่าผ่าน UI

กด Cmd+K Cmd+S (กด Cmd+K แล้วปล่อย แล้วกด Cmd+S)
ค้นหา Copy Line Down
คลิกที่ keybinding เดิม แล้วกด Cmd+D เพื่อกำหนด shortcut ใหม่