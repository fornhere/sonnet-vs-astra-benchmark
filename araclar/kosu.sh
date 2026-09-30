#!/bin/bash
# Kullanım: ./kosu.sh <test-klasörü> sonnet|astra
# Her model kendi alt klasöründe (t*/sonnet, t*/astra) sıfırdan, birbirini görmeden çalışır.
set -u
K=/home/forn/sonnet-vs-astra; T="$1"; M="$2"; TO="${3:-10800}"
W="$K/$T/$M"; mkdir -p "$W"
PROMPT="$(cat "$K/ORTAK.md"; echo; cat "$K/$T/GOREV.md")"
printf '%s\n' "$PROMPT" > "$W/.istem.txt"
BAS=$(date +%s); echo "{\"test\":\"$T\",\"model\":\"$M\",\"baslangic\":\"$(date -Iseconds)\"}" > "$W/.kosu-basla.json"
cd "$W"
if [ "$M" = sonnet ]; then
  C=/home/forn/.local/share/mise/installs/claude/2.1.284/claude
  U=$(env | grep -oE '^CLAUDE[A-Z_]*' | sed 's/^/-u /' | tr '\n' ' ')
  timeout "$TO" env $U "$C" -p "$PROMPT" --model claude-sonnet-5-5 --effort high \
    --permission-mode acceptEdits \
    --allowedTools "Bash Read Write Edit Glob Grep WebFetch WebSearch Skill TodoWrite" \
    --output-format stream-json --verbose </dev/null > "$W/.log.jsonl" 2> "$W/.stderr.log"
  RC=$?
else
  timeout "$TO" codex exec --skip-git-repo-check -m gpt-6-astra -c model_reasoning_effort=high \
    -c web_search=live -c sandbox_workspace_write.network_access=true \
    -s workspace-write -C "$W" --add-dir "$W" --add-dir /tmp --color never --json \
    -o "$W/.son-mesaj.md" - < "$W/.istem.txt" > "$W/.log.jsonl" 2> "$W/.stderr.log"
  RC=$?
fi
echo "{\"test\":\"$T\",\"model\":\"$M\",\"bitis\":\"$(date -Iseconds)\",\"sure_sn\":$(( $(date +%s)-BAS )),\"cikis\":$RC}" > "$W/.kosu-bitis.json"
echo "$T/$M bitti: çıkış $RC, $(( ($(date +%s)-BAS)/60 )) dk"
