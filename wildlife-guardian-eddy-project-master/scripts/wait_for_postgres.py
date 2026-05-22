import time
import os
import psycopg

def wait_for_pg(dsn, timeout=30):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with psycopg.connect(dsn, timeout=3) as conn:
                return True
        except Exception:
            time.sleep(1)
    return False

if __name__ == '__main__':
    dsn = os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/wildguard_test')
    ok = wait_for_pg(dsn, timeout=60)
    if not ok:
        raise SystemExit('Postgres did not become available')
    print('Postgres ready')
