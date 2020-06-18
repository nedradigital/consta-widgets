/* ⚠️
* В этом файле можно импортить только из danger и стандартных библиотек ноды,
* т.к. он выполняется через npx без установки всех пакетов
* */
const { danger, fail, warn, markdown } = require('danger')

const isValidCommit = commit => {
  return commit.message.length > 10
}

markdown(`Задача в Jira: ${danger.github.pr.head.ref}`)
markdown(`Ссылка на стенд: http://${danger.github.pr.head.ref}.gpn-components.csssr.cloud`)

if (danger.github.pr.title.length < 10) {
  fail('Заголовок PR должен быть осмысленным (длиной не менее 10 символов)')
}

if (!danger.github.pr.assignee) {
  const log = danger.github.pr.draft ? warn : fail

  log('Должен быть указан автор PR и ревьюеры')
}

if (!danger.git.commits.every(isValidCommit)) {
  fail('Сообщения к коммитам должны быть осмысленными (длиной не менее 10 символов)')
}
