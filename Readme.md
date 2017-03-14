<h1>Шаблон для быстрого старта верстки</h1>
<h2>Алиас для Bash(.bashrc)</h2>
createNewProject() {
  cd /C/Users/Serg/Desktop/projects
  git clone https://github.com/sergeyprimirenkov/template.git
  mv template $1
  cd $1
  mkdir img
  mkdir fonts
  mkdir js
  mkdir source
  cd source
  mkdir psd
  cd ..
  rm -rf .git settings.jar
  cd sass
  mkdir blocks
  cd ..
  sed -i "2s/project/$1/g" package.json
  npm i
  gulp
  #git init
  #git rm -r --cached node_modules
  #git commit -m "removing node_modules"
  #git add .
  #git commit -m "добавил файлы проекта"
  #git push
  #sub /C/Users/Serg/Desktop/projects/$1
}

alias new=createNewProject