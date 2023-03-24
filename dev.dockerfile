FROM ruby:2.7.7-bullseye

ARG GID=1000
ARG UID=1000
ARG GROUP=app
ARG USER=app
ARG WORKDIR=/app

ARG BUNDLER_VERSION=2.4.9
ARG NODEJS_VERSION=18.*
ARG RAILS_VERSION=6.1.7.3
ARG RUBYGEMS_VERSION=3.4.9
ARG YARN_VERSION=3.5.0

ENV GEM_HOME=/usr/local/bundle/_bundle
ENV PATH=$GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN groupadd -g $GID $GROUP \
    && useradd -g $GID -l -m -u $UID $USER \
    && gem update --system $RUBYGEMS_VERSION \
    && gem install bundler -v $BUNDLER_VERSION \
    && gem install rails -v $RAILS_VERSION \
    && chown -R $UID:$GID $GEM_HOME

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install --no-install-recommends -q -y nodejs=$NODEJS_VERSION \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable

COPY docker-entrypoint.sh /

WORKDIR $WORKDIR

USER $USER

RUN corepack prepare yarn@$YARN_VERSION --activate

ENTRYPOINT ["/docker-entrypoint.sh"]
