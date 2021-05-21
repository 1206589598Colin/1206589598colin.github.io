package logic

import (
	"fmt"
	"os/exec"
)

// 执行shell命令
func ExecCmd() {
	cmds := map[string]string{
		"docker": "exec -t vuepress yarn build",
		// "sleep":  "100",
		// "git":    "add . && git commit -m \"update\" && git push",
	}
	for cmdName, cmdArg := range cmds {
		cmd := exec.Command(cmdName, cmdArg)
		res := cmd.Run()
		fmt.Println(cmd)
		fmt.Println(res)
	}
}
