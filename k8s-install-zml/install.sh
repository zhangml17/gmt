#! /bin/bash

#设置默认参数
DEFAULT_CNI=flannel
DEFAULT_HA=nginx
DEFAULT_PROXY=iptables
DEFAULT_VERSION=v1.11.1
DEFAULT_REUSE=true

#$0:获取命令行的第一个参数，即要执行的文本名
usage(){
cat << EOF
usage:$0 [ -m MASTER(S) ] [ -n NODE(S) ] [ -i VIRTUAL-IP ] [ -p PASSORD ]
       [ -c CNI ] [ -a HA-STRATEGY ] [ -x PROXY-STATEGY ] [ -v KUBE-VERSION ]
       [ -r REUSE-MASTER-AS-NODE ] [ -k SCKEY ]
       [ -b BRANCH ] [ -s SCRIPT-BRANCH ]
use to deploy Kubernetes.
    -m : Specify the IP address(es) of Master node(s). If multiple, set the masters in term of csv, 
         as 'master-ip-1,master-ip-2,master-ip-3'.
    -p : Specify the uniform password of hosts. 
    advanced setting:
    -n : Specify the IP address(es) of Node node(s). If multiple, set the nodes in term of csv, 
         as 'node-ip-1,node-ip-2,node-ip-3'.
         If not specified, no nodes would be installed.
    -a : Specify the HA strategy, for instance: "nginx" or "vip".  
         If not specified, use "$DEFAULT_HA" by default.
    -i : Specify the virtual IP address. 
    -c : Specify the CNI strategy, for instance: "flannel" or "calico".  
         If not specified, use "$DEFAULT_CNI" by default.
    -x : Specify the proxy strategy, for instance: "iptables" or "ipvs".  
         If not specified, use "$DEFAULT_PROXY" by default.
    -v : Specify the version of Kubernetes to install.  
         If not specified, install "$DEFAULT_VERSION" by default.
    -r : Define if reusing master as node, which means installing node components on master or not.
         If not specified, reuse master as node by default. 
    -k : Specify the SCKEY of the user to send note to. If multiple, set the keys in term of csv, 
         as 'key-1,key-2,key-3'. 
    debug setting:
    -b : Specify the branch of code. 
         If not specified, use "master" by default.
    -s : Specify the branch of stage scripts. 
         If not specified, set the value of -b by default.
This script should run on a Master (to be) node.
EOF
exit -1
}

#获取命令行参数
while getopts "um:p:n:a:i:c:x:v:rk:b:s:" opt;do 
  case "$opt" in
    u) usage
    ;;
    m) MASTER=$OPTARG;;
    p) PASSWD=$OPTARG;;
    n) ONLY_NODE=$OPTARG;;
    a) HA=$OPTARG;;
    i) VIP=$OPTARG;;
    c) CNI=$OPTARG;;
    x) PROXY=$OPTARG;;
    v) VERSION=$OPTARG;;
    r) REUSE=FALSE;;
    k) SCKEY=$OPTARG;;
    b) BRANCH=$OPTARG;;
    s) STAGES_BRANCH=$OPTARG;;
    ?) 
       echo "unkonw argument"
       exit -1
     ;;
  esac
done

#只输入脚本 其后未根任何参数时，输出脚本的usage
#[ -z "$*"] && usage

#当脚本命令之后没有-m参数时，提示必须带-m参数
chk_var () {
if [ -z "$2" ]; then
  echo "$(date -d today +'%Y-%m-%d %H:%M:%S') - [ERROR] - no input for \"$1\", try \"$0 -u\"."
  sleep 3
  exit 1
fi
}
chk_var -m $MASTER
