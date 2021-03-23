import{o as n,c as s,a}from"./app.8ae45ef2.js";const t='{"title":"","description":"","frontmatter":{},"relativePath":"angel-docs/main.md","lastUpdated":1616534796605}',p={},o=a('<ul><li>Project Name: AngelDocs</li><li>File Name: <a href="http://main.py" target="_blank" rel="noopener noreferrer">main.py</a></li><li>Programmer: Kai Prince</li><li>Date: Sun, Mar 21, 2021</li><li>Description: This file contains the main function.</li></ul><div class="language-python"><pre><code><span class="token keyword">import</span> shutil\n<span class="token keyword">import</span> argparse\n<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path\n<span class="token keyword">import</span> json\n<span class="token keyword">import</span> pycco\n<span class="token keyword">from</span> markdownify <span class="token keyword">import</span> markdownify\n\n<span class="token keyword">import</span> config\n\n\n\n</code></pre></div><p>Warning: The source path will be appended to the output directory. It is best to run the program from the expected base directory. e.g.:</p><ul><li>&quot;.&quot; at project/src produces output/file1.md (good)</li><li>&quot;src&quot; at project produces output/src/file1.md (good)</li><li>BUT &quot;../src&quot; at project/other produces output/../src/file1.md (bad)</li></ul><div class="language-python"><pre><code>\n\n\n</code></pre></div><p>This is the entrypoint for the application.</p><div class="language-python"><pre><code><span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n</code></pre></div><div class="language-python"><pre><code>\n    parser <span class="token operator">=</span> argparse<span class="token punctuation">.</span>ArgumentParser<span class="token punctuation">(</span>\n        description<span class="token operator">=</span><span class="token string">&quot;Generate beautiful and comprehensive documentation from source.&quot;</span>\n    <span class="token punctuation">)</span>\n    parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span>\n        <span class="token string">&quot;-p&quot;</span><span class="token punctuation">,</span>\n        <span class="token string">&quot;--project&quot;</span><span class="token punctuation">,</span>\n        <span class="token builtin">type</span><span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">,</span>\n        dest<span class="token operator">=</span><span class="token string">&quot;output_dir&quot;</span><span class="token punctuation">,</span>\n        default<span class="token operator">=</span><span class="token string">&quot;docs&quot;</span><span class="token punctuation">,</span>\n        <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;The name of the project page for these files.&quot;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">)</span>\n    parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&quot;files&quot;</span><span class="token punctuation">,</span> nargs<span class="token operator">=</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;files to process&quot;</span><span class="token punctuation">)</span>\n    args <span class="token operator">=</span> parser<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Resolve file globs</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token keyword">for</span> raw_source <span class="token keyword">in</span> args<span class="token punctuation">.</span>files<span class="token punctuation">:</span>\n        <span class="token keyword">for</span> file_or_dir <span class="token keyword">in</span> Path<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>glob<span class="token punctuation">(</span>raw_source<span class="token punctuation">)</span><span class="token punctuation">:</span>\n            <span class="token keyword">if</span> file_or_dir<span class="token punctuation">.</span>is_dir<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n                files<span class="token punctuation">.</span>extend<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token builtin">file</span> <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> file_or_dir<span class="token punctuation">.</span>rglob<span class="token punctuation">(</span><span class="token string">&quot;*.*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n            <span class="token keyword">else</span><span class="token punctuation">:</span>\n                files<span class="token punctuation">.</span>append<span class="token punctuation">(</span>file_or_dir<span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Get job paths.</p><div class="language-python"><pre><code>    project_name <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>output_dir<span class="token punctuation">)</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token string">&quot;\\&quot;&#39;&quot;</span><span class="token punctuation">)</span>\n    project_dir <span class="token operator">=</span> Path<span class="token punctuation">(</span>config<span class="token punctuation">.</span>site_dir<span class="token punctuation">)</span> <span class="token operator">/</span> project_name\n    site_config_file <span class="token operator">=</span> Path<span class="token punctuation">(</span>config<span class="token punctuation">.</span>site_dir<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token string">&quot;siteConfig.json&quot;</span>\n    outdir <span class="token operator">=</span> config<span class="token punctuation">.</span>outdir\n\n\n</code></pre></div><p>Clean output folders</p><div class="language-python"><pre><code>    <span class="token keyword">if</span> outdir<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        shutil<span class="token punctuation">.</span>rmtree<span class="token punctuation">(</span>outdir<span class="token punctuation">)</span>\n    outdir<span class="token punctuation">.</span>mkdir<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">if</span> project_dir<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        shutil<span class="token punctuation">.</span>rmtree<span class="token punctuation">(</span>project_dir<span class="token punctuation">)</span>\n    project_dir<span class="token punctuation">.</span>mkdir<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">if</span> site_config_file<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        site_config_file<span class="token punctuation">.</span>unlink<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Run pycco on files</p><div class="language-python"><pre><code>    pycco<span class="token punctuation">.</span>process<span class="token punctuation">(</span>files<span class="token punctuation">,</span> outdir<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">(</span>outdir<span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> skip<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> md<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Make config</p><div class="language-python"><pre><code>    files <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            <span class="token string">&quot;text&quot;</span><span class="token punctuation">:</span> <span class="token builtin">file</span><span class="token punctuation">.</span>stem<span class="token punctuation">,</span>\n            <span class="token string">&quot;link&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>Path<span class="token punctuation">(</span>project_name<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">file</span><span class="token punctuation">.</span>relative_to<span class="token punctuation">(</span>outdir<span class="token punctuation">)</span><span class="token punctuation">.</span>stem<span class="token punctuation">)</span><span class="token punctuation">.</span>as_posix<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> outdir<span class="token punctuation">.</span>rglob<span class="token punctuation">(</span><span class="token string">&quot;*.*&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span>\n    site_config <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token string">&quot;projects&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n                <span class="token string">&quot;text&quot;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>project_name<span class="token punctuation">.</span>capitalize<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>\n                <span class="token string">&quot;link&quot;</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f&quot;/</span><span class="token interpolation"><span class="token punctuation">{</span>project_name<span class="token punctuation">}</span></span><span class="token string">/&quot;</span></span><span class="token punctuation">,</span>\n                <span class="token string">&quot;tree&quot;</span><span class="token punctuation">:</span> files<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n\n</code></pre></div><p>Write config file for static site generator.</p><div class="language-python"><pre><code>    site_config_file<span class="token punctuation">.</span>write_text<span class="token punctuation">(</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>site_config<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Create index file</p><div class="language-python"><pre><code>    <span class="token punctuation">(</span>outdir <span class="token operator">/</span> <span class="token string">&quot;index.md&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>write_text<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;# </span><span class="token interpolation"><span class="token punctuation">{</span>project_name<span class="token punctuation">.</span>capitalize<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>\n\n\n</code></pre></div><p>Move files to static site shutil.copytree(outdir, project_dir)</p><div class="language-python"><pre><code>    <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> outdir<span class="token punctuation">.</span>rglob<span class="token punctuation">(</span><span class="token string">&quot;*.*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token builtin">file</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span>project_dir <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Done.&quot;</span><span class="token punctuation">)</span>\n\n\n<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>\n    main<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n\n</code></pre></div>',24);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
