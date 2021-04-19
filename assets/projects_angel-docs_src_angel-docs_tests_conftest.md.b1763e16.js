import{o as n,c as s,a}from"./app.02f784e1.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"projects/angel-docs/src/angel-docs/tests/conftest.md","lastUpdated":1618849832689}',p={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: <a href="http://conftest.py" target="_blank" rel="noopener noreferrer">conftest.py</a></li><li>Programmer: Kai Prince</li><li>Date: Tue, Apr 13, 2021</li><li>Description: This file contains config for tests.</li></ul><div class="language-python"><pre><code><span class="token keyword">import</span> os\n<span class="token keyword">import</span> pytest\n<span class="token keyword">import</span> shutil\n\n\n\n</code></pre></div><p>Copy mock files to temp directory.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span><span class="token punctuation">(</span>autouse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_files_dir</span><span class="token punctuation">(</span>tmp_path<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>    path_of_current_module <span class="token operator">=</span> request<span class="token punctuation">.</span>fspath<span class="token punctuation">.</span>dirname\n    FILES_FOLDER <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>path_of_current_module<span class="token punctuation">,</span> <span class="token string">&quot;sample&quot;</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Copy files in test uploads folder to temp directory</p><div class="language-python"><pre><code>    shutil<span class="token punctuation">.</span>copytree<span class="token punctuation">(</span>FILES_FOLDER<span class="token punctuation">,</span> tmp_path<span class="token punctuation">,</span> dirs_exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">yield</span> tmp_path\n\n\n</code></pre></div><p>Teardown</p><div class="language-python"><pre><code>\n\n\n</code></pre></div><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span><span class="token punctuation">(</span>scope<span class="token operator">=</span><span class="token string">&quot;function&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">change_test_dir</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> tmp_path<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    os<span class="token punctuation">.</span>chdir<span class="token punctuation">(</span>tmp_path<span class="token punctuation">)</span>\n    <span class="token keyword">yield</span> os<span class="token punctuation">.</span>chdir\n    os<span class="token punctuation">.</span>chdir<span class="token punctuation">(</span>request<span class="token punctuation">.</span>config<span class="token punctuation">.</span>invocation_dir<span class="token punctuation">)</span>\n\n</code></pre></div>',10);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
