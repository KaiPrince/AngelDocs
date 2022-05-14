import{o as n,c as s,a}from"./app.6fc968a2.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"projects/angel-docs/src/angel-docs/tests/test_ignore_flag.md","lastUpdated":1652553022277}',p={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: test_ignore_flag.py</li><li>Programmer: Kai Prince</li><li>Date: Mon, Apr 19, 2021</li><li>Description: This file contains test for a --ignore flag.</li></ul><div class="language-python"><pre><code>\n<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path\n<span class="token keyword">from</span> utils <span class="token keyword">import</span> make_ignore_matcher\n<span class="token keyword">import</span> pytest\n<span class="token keyword">from</span> main <span class="token keyword">import</span> build_docs<span class="token punctuation">,</span> resolve_file_sources\n\n\n\n</code></pre></div><p>Does not include files matching the ignore pattern in generated output.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ignore_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_not_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;project/module/**/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;module/__init__.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/Readme.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>usefixtures</span><span class="token punctuation">(</span><span class="token string">&quot;change_test_dir&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_ignore_flag</span><span class="token punctuation">(</span>source_paths<span class="token punctuation">,</span> ignore_paths<span class="token punctuation">,</span> expected_paths<span class="token punctuation">,</span> expected_not_paths<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>\n\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>output_dir<span class="token punctuation">}</span></span><span class="token string">/project/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths<span class="token punctuation">]</span>\n    expected_not <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>output_dir<span class="token punctuation">}</span></span><span class="token string">/project/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_not_paths<span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>source_paths<span class="token punctuation">,</span> ignore_paths<span class="token operator">=</span>ignore_paths<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_not<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> <span class="token keyword">not</span> Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n\n</code></pre></div><p>Ignores files matching the ignore pattern.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;source_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ignore_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_paths&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;expected_not_paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;project&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;project/module/**/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;setup.py&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span><span class="token string">&quot;module/__init__.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/file.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;module/Readme.md&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>usefixtures</span><span class="token punctuation">(</span><span class="token string">&quot;change_test_dir&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_resolve_ignored_files</span><span class="token punctuation">(</span>\n    source_paths<span class="token punctuation">,</span> ignore_paths<span class="token punctuation">,</span> expected_paths<span class="token punctuation">,</span> expected_not_paths\n<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>\n\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    output_dir <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>\n    expected <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;project/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_paths<span class="token punctuation">]</span>\n    expected_not <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;project/</span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_not_paths<span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> resolve_file_sources<span class="token punctuation">(</span>source_paths<span class="token punctuation">,</span> ignore_paths<span class="token operator">=</span>ignore_paths<span class="token punctuation">)</span>\n    build_docs<span class="token punctuation">(</span>files<span class="token punctuation">,</span> output_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> <span class="token builtin">str</span><span class="token punctuation">(</span>Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">in</span> files\n    <span class="token keyword">for</span> path <span class="token keyword">in</span> expected_not<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> <span class="token builtin">str</span><span class="token punctuation">(</span>Path<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">not</span> <span class="token keyword">in</span> files\n\n\n\n</code></pre></div><p>Unit test for path matching algorithm.</p><div class="language-python"><pre><code><span class="token decorator annotation punctuation">@pytest<span class="token punctuation">.</span>mark<span class="token punctuation">.</span>parametrize</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token string">&quot;pattern&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;paths&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span>\n            <span class="token string">&quot;.\\\\venv\\\\**\\\\*&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>\n                <span class="token string">&quot;venv\\\\Scripts\\\\symilar.exe&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;venv\\\\Scripts\\\\pythonw.exe&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;venv\\\\Lib\\\\site-packages\\\\_distutils_hack\\\\override.py&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token string">&quot;.\\\\**\\\\*cache*\\\\**\\\\*&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>\n                <span class="token string">&quot;__pycache__\\\\main.cpython-39.pyc&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;__pycache__\\\\config.cpython-39.pyc&quot;</span><span class="token punctuation">,</span>\n                <span class="token string">&quot;tests\\\\__pycache__\\\\conftest.cpython-39-pytest-6.2.2.pyc&quot;</span><span class="token punctuation">,</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">def</span> <span class="token function">test_pattern_match</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> paths<span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><p>Arrange</p><div class="language-python"><pre><code>    is_ignored <span class="token operator">=</span> make_ignore_matcher<span class="token punctuation">(</span><span class="token punctuation">[</span>pattern<span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Act</p><div class="language-python"><pre><code>    ignored_paths <span class="token operator">=</span> <span class="token punctuation">[</span>path <span class="token keyword">for</span> path <span class="token keyword">in</span> paths <span class="token keyword">if</span> is_ignored<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span>\n\n\n</code></pre></div><p>Assert</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> path <span class="token keyword">in</span> paths<span class="token punctuation">:</span>\n        <span class="token keyword">assert</span> path <span class="token keyword">in</span> ignored_paths\n\n\n</code></pre></div>',28);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};