FROM ruby:2.7.7-bullseye

ARG GID=1000
ARG UID=1000
ARG GROUP=app
ARG USER=app
ARG WORKDIR=/app

ARG BUNDLER_VERSION=2.4.9
ARG RUBYGEMS_VERSION=3.4.9
ARG YARN_VERSION=1.22.19

ENV GEM_HOME=/usr/local/bundle/_bundle
ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV PATH=$GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN groupadd -g $GID $GROUP \
    && useradd -g $GID -l -m -u $UID $USER \
    && mkdir -p $WORKDIR \
    && gem update --system $RUBYGEMS_VERSION \
    && gem install bundler -v $BUNDLER_VERSION \
    && chown -R $UID:$GID $GEM_HOME $WORKDIR \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install --no-install-recommends -q -y \
      nodejs \
      vim \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g yarn@$YARN_VERSION

COPY docker-entrypoint.sh /

USER $USER

WORKDIR $WORKDIR

COPY --chown=$UID:$GID Gemfile Gemfile.lock $WORKDIR/

RUN bundle install

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
