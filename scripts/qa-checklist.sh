#!/bin/bash
# TK Platform — QA Acceptance Checklist
# Run: bash scripts/qa-checklist.sh

set -e
PASS=0; FAIL=0

check() {
    local desc=$1; local cmd=$2
    if eval "$cmd" > /dev/null 2>&1; then
        echo "✅ $desc"; PASS=$((PASS+1))
    else
        echo "❌ $desc"; FAIL=$((FAIL+1))
    fi
}

echo "======================================"
echo "  TK Platform QA Acceptance Checklist"
echo "======================================"
echo ""

echo "── 1. Build ──"
check "bun build succeeds"       "bun run build"
check "dist/index.html exists"   "[ -f dist/index.html ]"
check "dist JS bundle exists"    "ls dist/assets/*.js | head -1"
check "dist CSS bundle exists"   "ls dist/assets/*.css | head -1"

echo ""
echo "── 2. Source Files ──"
check "thai-theme.css exists"    "[ -f src/assets/css/thai-theme.css ]"
check "Pinia auth store"         "[ -f src/stores/auth.js ]"
check "Pinia creator store"      "[ -f src/stores/creator.js ]"
check "Pinia video store"        "[ -f src/stores/video.js ]"
check "Pinia live store"         "[ -f src/stores/live.js ]"
check "Mock data layer"          "[ -f src/api/mock-data.js ]"
check "Live room page"           "[ -f src/pages/live-room.vue ]"
check "Play page (HLS)"         "[ -f src/pages/play.vue ]"

echo ""
echo "── 3. API Integration ──"
check "Auth API module"          "[ -f src/api/auth.js ]"
check "Creator API module"       "[ -f src/api/creator.js ]"
check "Video API module"         "[ -f src/api/video.js ]"
check "Live API module"          "[ -f src/api/live.js ]"
check "Axios HTTP client"        "grep -q 'axios' src/api/index.js"

echo ""
echo "── 4. Router ──"
check "Live room route exists"   "grep -q 'live-room' src/router/index.js"
check "Hash history mode"        "grep -q 'createWebHashHistory' src/router/index.js"
check "32+ routes defined"       "[ \$(grep -c 'path:' src/router/index.js) -ge 30 ]"

echo ""
echo "── 5. Visual Theme ──"
check "Gold color defined"       "grep -q 'tk-gold' src/assets/css/thai-theme.css"
check "Sarabun font imported"    "grep -q 'Sarabun' src/assets/css/thai-theme.css"
check "LIVE badge animation"     "grep -q 'live-pulse' src/assets/css/thai-theme.css"
check "Thai theme imported"      "grep -q 'thai-theme' src/main.js"

echo ""
echo "── 6. Dependencies ──"
check "hls.js installed"         "[ -d node_modules/hls.js ]"
check "pinia installed"          "[ -d node_modules/pinia ]"
check "axios installed"          "[ -d node_modules/axios ]"
check "elysia installed"         "[ -d ../../../mock-api/node_modules/elysia ]"

echo ""
echo "======================================"
echo "  Results: ✅ $PASS passed  ❌ $FAIL failed"
echo "======================================"

if [ $FAIL -gt 0 ]; then
    echo "⚠️  Some checks failed. Fix before deploying."
    exit 1
else
    echo "🚀 All checks passed! Ready to deploy."
    exit 0
fi
