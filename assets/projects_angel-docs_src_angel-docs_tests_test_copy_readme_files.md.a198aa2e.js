import{o as s,c as n,a}from"./app.8e4b94d5.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"projects/angel-docs/src/angel-docs/tests/test_copy_readme_files.md","lastUpdated":1618971443401}',e={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: test_copy_readme_files.py</li><li>Programmer: Kai Prince</li><li>Date: Tue, Apr 13, 2021</li><li>Description: This file contains tests for the &quot;Copy readme files&quot; feature.</li></ul><div class="language-python"><pre><code>\n<span class="token keyword">from</span> main <span class="token keyword">import</span> build_docs<span class="token punctuation">,</span> resolve_file_sources\n<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path\n\n\n\n</code></pre></div><p>Copies all .md files from the source folder to the output.</p><div class="language-python"><pre><code><span class="token keyword">def</span> <span class="token function">test_copy_readme_file</span><span class="token punctuation">(</span>change_test_dir<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>\n    sources <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">]</span>\n    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>sources<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">assert</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/project/module/Readme.md&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/project/module/Readme.md&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read_text<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;# This is a test\\n&quot;</span>\n\n\n</code></pre></div>',10);e.render=function(a,t,e,p,c,l){return s(),n("div",null,[o])};export default e;export{t as __pageData};
