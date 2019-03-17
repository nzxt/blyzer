import Vue from 'vue'
import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// Add fonts to whitelist
let Font = Quill.import('formats/font');
let Size = Quill.import('attributors/style/size');

// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['times-new-roman', 'verdana', 'tahoma', 'arial', 'courier-new'];
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Font, true);
Quill.register(Size, true);

Vue.use(VueQuillEditor)
