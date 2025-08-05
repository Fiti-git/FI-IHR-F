#!/usr/bin/env bash
set -e

# Create directory structure
mkdir -p src/api \
         src/assets \
         src/components \
         src/features/auth \
         src/features/project \
         src/features/support \
         src/hooks \
         src/router \
         src/store \
         src/theme

# Create files with a one-line comment inside each
cat > src/api/client.js << 'EOF'
// src/api/client.js
EOF

cat > src/assets/logo.svg << 'EOF'
<!-- src/assets/logo.svg -->
EOF

cat > src/components/Button.jsx << 'EOF'
// src/components/Button.jsx
EOF

cat > src/components/Spinner.jsx << 'EOF'
// src/components/Spinner.jsx
EOF

cat > src/features/auth/AuthPage.jsx << 'EOF'
// src/features/auth/AuthPage.jsx
EOF

cat > src/features/auth/AuthForm.jsx << 'EOF'
// src/features/auth/AuthForm.jsx
EOF

cat > src/features/auth/authValidation.js << 'EOF'
// src/features/auth/authValidation.js
EOF

cat > src/features/auth/authSlice.js << 'EOF'
// src/features/auth/authSlice.js
EOF

cat > src/features/auth/authAPI.js << 'EOF'
// src/features/auth/authAPI.js
EOF

cat > src/features/project/ProjectList.jsx << 'EOF'
// src/features/project/ProjectList.jsx
EOF

cat > src/features/project/ProjectForm.jsx << 'EOF'
// src/features/project/ProjectForm.jsx
EOF

cat > src/features/project/projectValidation.js << 'EOF'
// src/features/project/projectValidation.js
EOF

cat > src/features/project/projectSlice.js << 'EOF'
// src/features/project/projectSlice.js
EOF

cat > src/features/project/projectAPI.js << 'EOF'
// src/features/project/projectAPI.js
EOF

cat > src/features/support/SupportList.jsx << 'EOF'
// src/features/support/SupportList.jsx
EOF

cat > src/features/support/SupportForm.jsx << 'EOF'
// src/features/support/SupportForm.jsx
EOF

cat > src/features/support/supportValidation.js << 'EOF'
// src/features/support/supportValidation.js
EOF

cat > src/features/support/supportSlice.js << 'EOF'
// src/features/support/supportSlice.js
EOF

cat > src/features/support/supportAPI.js << 'EOF'
// src/features/support/supportAPI.js
EOF

cat > src/hooks/useAuth.js << 'EOF'
// src/hooks/useAuth.js
EOF

cat > src/router/ProtectedRoute.jsx << 'EOF'
// src/router/ProtectedRoute.jsx
EOF

cat > src/router/routes.jsx << 'EOF'
// src/router/routes.jsx
EOF

cat > src/store/index.js << 'EOF'
// src/store/index.js
EOF

cat > src/theme/theme.js << 'EOF'
// src/theme/theme.js
EOF

cat > src/App.jsx << 'EOF'
// src/App.jsx
EOF

cat > src/main.jsx << 'EOF'
// src/main.jsx
EOF

echo "Project structure created successfully."
