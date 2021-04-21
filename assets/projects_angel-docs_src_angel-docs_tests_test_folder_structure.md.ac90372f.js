import{o as n,c as s,a}from"./app.8e4b94d5.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"projects/angel-docs/src/angel-docs/tests/test_folder_structure.md","lastUpdated":1618971443401}',p={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: test_folder_structure.py</li><li>Programmer: Kai Prince</li><li>Date: Tue, Mar 23, 2021</li><li>Description: This file contains tests for the nested folder structure feature.</li></ul><div class="language-python"><pre><code><span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path\n<span class="token keyword">import</span> pytest\n<span class="token keyword">from</span> main <span class="token keyword">import</span> build_docs<span class="token punctuation">,</span> resolve_file_sources\n\n\n\n</code></pre></div><p>Builds the output folder structure to match the input folder structure.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;working_dir&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;source_dir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token string">&quot;project&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        pytest<span class="token punctuation">.</span>param<span class="token punctuation">(</span>\n            <span class="token string">&quot;project&quot;</span><span class="token punctuation">,</span>\n            <span class="token string">&quot;../project/&quot;</span><span class="token punctuation">,</span>\n            marks<span class="token operator">=</span>pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>skip<span class="token punctuation">(</span><span class="token string">&quot;Walking up guarding not yet implemented.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token punctuation">(</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span>\n                <span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;module/__init__.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;module/file.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;.ignoreme&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;.ignoremetoo/ignored.py&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;**/*.*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_folder_nesting</span><span class="token punctuation">(</span>\n    working_dir<span class="token punctuation">,</span>\n    source_dir<span class="token punctuation">,</span>\n    source_paths<span class="token punctuation">,</span>\n    expected_paths<span class="token punctuation">,</span>\n    change_test_dir<span class="token punctuation">,</span>\n<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    <span class="token keyword">if</span> working_dir <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>\n        change_test_dir<span class="token punctuation">(</span>working_dir<span class="token punctuation">)</span>\n    <span class="token keyword">if</span> <span class="token builtin">callable</span><span class="token punctuation">(</span>source_dir<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        source_dir <span class="token operator">=</span> source_dir<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    sources <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>source_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> source_paths<span class="token punctuation">]</span>\n    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>output_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>source_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths<span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>sources<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoreme&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoremetoo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n\n</code></pre></div><p>Builds the output folder structure to match the input folder structure.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;working_dir&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;source_dir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">(</span><span class="token keyword">lambda</span><span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>cwd<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>absolute<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;project&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span>\n                <span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;module/__init__.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;module/file.py&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;.ignoreme&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;.ignoremetoo/ignored.py&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;**/*.*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>usefixtures</span><span class="token punctuation">(</span><span class="token string">&quot;change_test_dir&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_folder_nesting_absolute_path</span><span class="token punctuation">(</span>\n    working_dir<span class="token punctuation">,</span>\n    source_dir<span class="token punctuation">,</span>\n    source_paths<span class="token punctuation">,</span>\n    expected_paths<span class="token punctuation">,</span>\n<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>\n\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    <span class="token keyword">if</span> <span class="token builtin">callable</span><span class="token punctuation">(</span>working_dir<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        working_dir <span class="token operator">=</span> working_dir<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    sources <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>working_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>source_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> source_paths<span class="token punctuation">]</span>\n    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>working_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>output_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>source_dir<span class="token punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths\n    <span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>sources<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoreme&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoremetoo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n\n</code></pre></div><p>Resursively searches the children when given a folder.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>usefixtures</span><span class="token punctuation">(</span><span class="token string">&quot;change_test_dir&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_recurse_folder</span><span class="token punctuation">(</span>source_paths<span class="token punctuation">,</span> expected_paths<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>\n\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>output_dir<span class="token punctuation">}</span></span><span class="token string">/project/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths<span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>source_paths<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoreme&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span><span class="token string">&quot;output/.ignoremetoo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n</code></pre></div>',28);p.render=function(a,t,p,c,e,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
