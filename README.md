# 2021.1-Pro-Especies-Backend

## 1. Ambiente de desenvolvimento
Para fazer uso do ambiente de desenvolvimento é necessário possuir dois pacotes instalados.
* docker
* docker-compose

## 1.1 Mas o que é Docker?
Docker é uma plataforma aberta, criada com o objetivo de facilitar o desenvolvimento, a implantação e a execução de aplicações em ambientes isolados. Para uma base maior do seu propósito e funcionamento é possível acessar o seguinte link:

https://www.redhat.com/pt-br/topics/containers/what-is-docker

### 1.1 Instalação do Docker
*O tutorial será baseado em sistemas Debian-based ou seja Ubuntu, Mint, Debian e etc*

Primeiro se faz necessário dar o seguinte comando:

```bash
sudo apt-get update
```

Agora se faz necessário a instalação de aguns pacotes de pré-requisitos:

```bash
sudo apt-get install  curl apt-transport-https ca-certificates software-properties-common
```

Após isso, podemos adicionar os repositórios para acesso ao pacote docker com os seguintes comandos:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

```bash
sudo apt update
```

Agora finalmente a instalação do pacote:

```
sudo apt install docker-ce
```

Com o docker instalado é muito importante a configuração de Post-installation. Que pode ser vista no seguinte link:
https://docs.docker.com/engine/install/linux-postinstall/

### 1.2 Instalação do Docker-compose

Para instalação do **docker-compose**, basta rodar os seguintes comandos:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
udo chmod +x /usr/local/bin/docker-compose
```


## 1.3 Uso do Docker e Docker-compose
Para efetuar o build das imagens só se faz necessário rodar o seguinte comando na raiz do projeto:

```bash
make
```

Após o build, podemos fazer o comando na raiz do projeto para iniciar a imagem criada:
```bash
make up
```