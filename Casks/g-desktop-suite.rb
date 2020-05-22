cask 'g-desktop-suite' do
  version '0.2.2'
  sha256 '63b593b1e669cf7da91a74999dd75323b481112b9d0d5e821e5d8fe429d933f7'

  url "https://github.com/alexkim205/G-Desktop-Suite/releases/latest/download/G.Desktop.Suite-#{version}.dmg"
  appcast 'https://github.com/alexkim205/G-Desktop-Suite/releases.atom'
  name 'G Desktop Suite'
  homepage 'https://github.com/alexkim205/G-Desktop-Suite'

  app 'G Desktop Suite.app'
end
