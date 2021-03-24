import{o as n,c as s,b as a}from"./app.5115d591.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"angel-docs/test_folder_structure.md","lastUpdated":1616569035622}',p={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: test_folder_structure.py</li><li>Programmer: Kai Prince</li><li>Date: Tue, Mar 23, 2021</li><li>Description: This file contains tests for the nested folder structure feature.</li></ul><div class="language-python"><pre><code><span class="token keyword">import</span> os\n<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path\n<span class="token keyword">import</span> shutil\n<span class="token keyword">import</span> pytest\n<span class="token keyword">from</span> main <span class="token keyword">import</span> resolve_file_sources<span class="token punctuation">,</span> build_docs\n\n\n\n</code></pre></div><p>Copy mock files to temp directory.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_files_dir</span><span class="token punctuation">(</span>tmp_path<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>    path_of_current_module <span class="token operator">=</span> request<span class="token punctuation">.</span>fspath<span class="token punctuation">.</span>dirname\n    FILES_FOLDER <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>path_of_current_module<span class="token punctuation">,</span> <span class="token string">&quot;sample&quot;</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Copy files in test uploads folder to temp directory</p><div class="language-python"><pre><code>    shutil<span class="token punctuation">.</span>copytree<span class="token punctuation">(</span>FILES_FOLDER<span class="token punctuation">,</span> tmp_path<span class="token punctuation">,</span> dirs_exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">yield</span> tmp_path\n\n\n</code></pre></div><p>Teardown</p><div class="language-python"><pre><code>\n\n\n</code></pre></div><p>Builds the output folder structure to match the input folder structure.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>fixture</span><span class="token punctuation">(</span>scope<span class="token operator">=</span><span class="token string">&quot;function&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">change_test_dir</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> tmp_path<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    os<span class="token punctuation">.</span>chdir<span class="token punctuation">(</span>tmp_path<span class="token punctuation">)</span>\n    <span class="token keyword">yield</span> os<span class="token punctuation">.</span>chdir\n    os<span class="token punctuation">.</span>chdir<span class="token punctuation">(</span>request<span class="token punctuation">.</span>config<span class="token punctuation">.</span>invocation_dir<span class="token punctuation">)</span>\n\n\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.py&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;**/*.*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_folder_nesting</span><span class="token punctuation">(</span>source_paths<span class="token punctuation">,</span> expected_paths<span class="token punctuation">,</span> test_files_dir<span class="token punctuation">,</span> change_test_dir<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    base_output_dir <span class="token operator">=</span> Path<span class="token punctuation">(</span>test_files_dir<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token string">&quot;output&quot;</span> <span class="token operator">/</span> <span class="token string">&quot;project&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span>base_output_dir <span class="token operator">/</span> path <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths<span class="token punctuation">]</span>\n    base_source_dir <span class="token operator">=</span> Path<span class="token punctuation">(</span>test_files_dir<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token string">&quot;project&quot;</span>\n    sources <span class="token operator">=</span> source_paths\n\n</code></pre></div><p>Change working directory (until absolute paths work.)</p><div class="language-python"><pre><code>    change_test_dir<span class="token punctuation">(</span>base_source_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Act breakpoint()</p><div class="language-python"><pre><code>    build_docs<span class="token punctuation">(</span>sources<span class="token punctuation">,</span> base_output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n\n</code></pre></div><p>Resolves relative paths that include ../</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>skip</span><span class="token punctuation">(</span><span class="token string">&quot;TODO&quot;</span><span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_path&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_output_path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span><span class="token string">&quot;crypto/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;crypto/__init__.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_denormalized_path</span><span class="token punctuation">(</span>\n    source_path<span class="token punctuation">,</span>\n    expected_output_path<span class="token punctuation">,</span>\n    test_files_dir<span class="token punctuation">,</span>\n    change_test_dir<span class="token punctuation">,</span>\n<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    change_test_dir<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>test_files_dir<span class="token punctuation">,</span> <span class="token string">&quot;Crypto&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    base_source <span class="token operator">=</span> <span class="token string">&quot;../Crypto/&quot;</span>\n    base_output <span class="token operator">=</span> Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>parent<span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span><span class="token string">&quot;../output/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    source <span class="token operator">=</span> base_source <span class="token operator">+</span> source_path\n    expected <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>base_output<span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span>expected_output_path<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    output_path <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span><span class="token punctuation">[</span>source<span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">assert</span> output_path <span class="token operator">==</span> <span class="token punctuation">[</span>expected<span class="token punctuation">]</span>\n\n\n\n</code></pre></div><p>Resolves absolute paths properly when appending to output dir.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>skip</span><span class="token punctuation">(</span><span class="token string">&quot;TODO&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_absolute_path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>    <span class="token keyword">pass</span>\n\n\n\n</code></pre></div><p>Generates the sidebar config that maps to the output folder structure.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>skip</span><span class="token punctuation">(</span><span class="token string">&quot;TODO&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_sidebar_links</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>    <span class="token keyword">pass</span>\n\n\n</code></pre></div>',33);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
