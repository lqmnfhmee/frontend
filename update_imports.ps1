$files = Get-ChildItem -Path "c:\Development\test\frontend\app", "c:\Development\test\frontend\lib" -Recurse -Include *.ts, *.tsx

foreach ($f in $files) {
    if ($f.PSIsContainer) { continue }
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    $modified = $false
    
    if ($content.Contains('@/lib/api/integrity')) {
        $content = $content.Replace('@/lib/api/integrity', '@/app/integrity/services/integrity')
        $modified = $true
    }
    if ($content.Contains('@/lib/dashboard-preferences')) {
        $content = $content.Replace('@/lib/dashboard-preferences', '@/app/integrity/utils/dashboard-preferences')
        $modified = $true
    }
    if ($content.Contains('@/app/integrity/widget-registry')) {
        $content = $content.Replace('@/app/integrity/widget-registry', '@/app/integrity/utils/widget-registry')
        $modified = $true
    }
    if ($content.Contains('@/app/components/shared/SCEDistributionChart')) {
        $content = $content.Replace('@/app/components/shared/SCEDistributionChart', '@/app/sce/components/SCEDistributionChart')
        $modified = $true
    }
    if ($content.Contains('../../../lib/api/integrity')) {
        # Edge case: Relative imports
        $content = $content.Replace('../../../lib/api/integrity', '@/app/integrity/services/integrity')
        $modified = $true
    }
    
    if ($modified) {
        Write-Host "Updating imports in $($f.FullName)"
        $utf8NoBom = New-Object System.Text.UTF8Encoding($False)
        [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
    }
}
Write-Host "Imports update complete."
