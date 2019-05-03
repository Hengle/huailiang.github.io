import os


# folder = "/Users/penghuailiang/Desktop/huailiang.github.io/"
folder = "/Users/penghuailiang/Documents/projects/huailiang.github.io/source/_posts/"

reg = []


for d in os.listdir(folder):
	file = os.path.join(folder,d)
	# print file
	lines = []
	with open(file, 'r') as f:
		lines = f.readlines()
		for i in range(len(lines)):
			if "```" in lines[i]:
				line = lines[i]
				
				if "py" in line or "python" in line or "Python" in line:
					lines[i] = "{% highlight python %}\n"
					continue
				if "cs" in line or "csharp" in line or "c#" in line:
					lines[i] = "{% highlight csharp %}\n"
					continue
				if "bash" in line or "sh" in line or "shell" in line:
					lines[i] = "{% highlight bash %}\n"
					continue
				if "cpp" in line or "c" in line:
					lines[i] = "{% highlight cpp %}\n"
					continue
				if "groovy" in line:
					lines[i] = "{% highlight groovy %}\n"
					continue
				if "r" in line:
					lines[i] = "{% highlight r %}\n"
					continue
				if "lua" in line:
					lines[i] = "{% highlight lua %}\n"
					continue
				if "hlsl" in line:
					lines[i] = "{% highlight c %}\n"
					continue
				if "javascript" in line or "js" in line:
					lines[i] = "{% highlight javascript %}\n"
					continue
				if "html" in line or "json" in line:
					lines[i] = "{% highlight json %}\n"
					continue
				if line == "```\n" or line == "```` \n" or line == "``` \t\n" or line == ' ```\n' or line == "  ```\n":
					lines[i] = "{% endhighlight %}\n"
					continue
				if not line in reg:
					reg.append(line)
				# print line
# print(reg)

	with open(file, 'w') as f:
		f.writelines(lines)

print(reg)

