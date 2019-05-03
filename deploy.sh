# ==============================================
# This tool is for fast deploy 
# ----------------------------------------------
# Author: Huailiang.Peng
# Data:   2019.05.03
# ==============================================
#!/bin/sh


path=$(cd `dirname $0`; pwd)
name="${path##*/}"
echo $path
echo $name

cd $path

echo "重新生成_site"

bundle exec jekyll b

cd ../

tempdir=`mktemp -d temp.XXXXXX`

cp -R $name $tempdir

cd  ${tempdir}/${name}

pwd

mv _site ../

mv README.md ../

mv LICENSE ../

echo "开始切换分支到master"

git clean -df

git checkout .

git checkout master

git pull

git status -s

pwd
 
for file in $(ls .)
do
    rm -rf $file
done


cd ../_site/

for file in $(ls .)
do
	mv  $file ../${name}/
done

cd ../

mv LICENSE $name

mv README.md $name

cd $name

git branch

echo "开始上传到github"

git add .

git commit -m "deploy "`date +"%Y-%m-%d"`

git push

cd ../../

rm -rf $tempdir

echo "job done, bye"