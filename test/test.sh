#! /bin/bash

COUNT=0
for j in $(seq -s ' ' 1 3);do
  [[ -z $(getent hosts zoo-${j}) ]] || COUNT=$[${COUNT}+1]
done

echo ${COUNT}
